<template>
    <div>
      <ColorTips />
      <ul v-for="(row_items, row_key) in reshapeItems(backCover_items)" :key="row_key" class="book-nav">
        <div>
        <li v-for="(item, item_key) in row_items" :key="item_key" 
        :class="assignColor(item)"
        :style="styles(item)" 
        id="back-cover" 
        @click="openDetail(item)" 
        >
          <fitty :options="fittyOptions"><template v-slot:content><span>{{ item.title }}</span></template></fitty>
        </li>
        <detail :item="content" v-show="showDetail" @close="closeDetail"/>
        </div>
      </ul>
      <infinite-loading @infinite="infiniteHandler" spinner="spiral">
        <div slot="spinner">ロード中...</div>
        <div slot="no-more">もう検索データが無いよ！</div>
        <div slot="no-results">検索結果が無い！</div>
      </infinite-loading>
    </div>
</template>

<script>
import Vue from 'vue';
import Db from "@/plugins/firestoreUtils.js";
Vue.use(Db)

import Detail from "@/components/Detail";
import OriginalHeader from "@/components/OriginalHeader.vue";
import ColorTips from "@/components/ColorTips";
import Fitty from 'vue-fitty' ;
// Install plugin 
Vue.use(Fitty);

export default {
    components: {
      Detail,
      ColorTips,
    },
    props:["items", "last_isbn"],
    data () {
        return {
          backCover_items: this.items,
          backCover_last_isbn: this.last_isbn,
          showDetail: false,
          tooltip_show: false,
          content: "",
          select: "",
          fittyOptions: {
            minSize: 1,
            maxSize: 15,
            multiLine: true,
          },
          baseCoverHeight: 200,
          // 文庫本をもとに高さ倍率を算出
          coverHightMagnification : {
            "単行本": 1.24, 
            "文庫": 1.00,  
            "新書": 1.24, 
            '全集・双書':1.10,
            '事・辞典':1.20,
            '図鑑':1.80,
            '絵本':1.80,
            'カセット,CDなど':1.00,
            'コミック':1.24,
            'ムックその他':1.50
          },
          coverColorType : {
            '文庫': 0,
            '小説・エッセイ': 0,
            '新書': 1,
            '人文・思想・社会': 1,
            'ビジネス・経済・就職': 1,
            '資格・検定': 1,
            '語学・学習参考書': 1,
            '美容・暮らし・健康・料理': 2,
            '旅行・留学・アウトドア': 2,
            'エンタメ・ゲーム': 2,
            'ホビー・スポーツ・美術': 2,
            '絵本・児童書・図鑑': 2,
            '科学・技術': 3,
            'パソコン・システム開発': 3,
            '医学・薬学・看護学・歯科学': 3,
            'ライトノベル': 4,
            '漫画（コミック）': 4,
            'ボーイズラブ': 4,
            '写真集・タレント': 4,
            'カレンダー・手帳・家計簿': 5,
            '文具・雑貨': 5,
            'セット本': 5,
            '付録付き': 5,
            'バーゲン本': 5,
            '楽譜': 5,
          },
        }
    },
    mounted: function() {
      OriginalHeader.data().bus.$on('change-category', this.categoryFilter); // カテゴリ変更があった場合に、表示済みの書籍を該当カテゴリのみの書籍にする。
      OriginalHeader.data().bus.$on('change-category', this.addData);
    },
    methods: {
      infiniteHandler($state) {
        const old_items_len = this.backCover_items.length
        setTimeout(() => {
          this.addData(this.select)
          this.$emit('update:items', this.backCover_items)
          this.$emit('update:last_isbn', this.backCover_last_isbn)
          $state.loaded();
        }, 1500)
        const new_items_len = this.backCover_items.length
        console.log(new_items_len)
        if (new_items_len >= 40 || (old_items_len != new_items_len && new_items_len < old_items_len + 20)) {
          console.log("complete")
          $state.complete();
        }
      },

      addData(select) {
        const l = this.backCover_items.length
        console.log(l)
        this.select = select;
        this.$addBooksData(this.last_isbn, select).then((books) => {
          this.backCover_items = this.backCover_items.concat(books.data)
          this.backCover_last_isbn = books.last_isbn
        });
      },

      categoryFilter () {
        // filter内の関数に用いるために変数を再度用意
        const select = select;
        if (select !== "指定しない" && select !== "") {
          this.backCover_items = this.backCover_items.filter(function(item) {
            return [select].includes(item.category);
          })
        } else {
          this.$getBooksData().then((books) => {
            this.backCover_items = books.data
            this.last_isbn = books.last_isbn
          });
        }
      },

      openDetail(item) {
        this.$modal.show('book-detail', {
          title: item.title,
          author: item.author,
          itemCaption: item.itemCaption,
          largeImageUrl:item.largeImageUrl,
          itemUrl : item.itemUrl, // 楽天ブックスのURL
          publisherName: item.publisherName,
          isbn : item.isbn,
          itemPrice : item.itemPrice,
          category : item.category,
          subcategory : item.subcategory,
          salesDate : item.salesDate,
          size: item.size,
        })
      },

      closeDetail() {
        this.$modal.hide('book-detail')
      },
      assignColor(item) {
        return "book-nav-items" + String(this.coverColorType[item.category]);
      },
      reshapeItems(items) {
        let arr = [];
        let row_arr = [];
        for (let i=0; i<items.length; i++) {
            row_arr.push(items[i]);
            if (i%20 == 19 || i == items.length-1) {
                arr.push(row_arr);
                row_arr = [];
            }
        }
        return arr;
      },
      styles(item) {
        let heightMagnification = 1.00;
        if (item.size !== "") {
          heightMagnification = this.coverHightMagnification[item.size]
        }
        let coverWidth = Math.floor(item.pages/4);
        let titleWidth = Math.floor(coverWidth * 0.8);
        let coverHeight = Math.floor(this.baseCoverHeight * heightMagnification)
        let titleHeight = Math.floor(coverHeight * 0.8);
        return {
          '--coverWidth': String(coverWidth) + "px",
          '--titleWidth': String(titleWidth) + "px",
          '--coverHeight': String(coverHeight) + "px",
          '--titleHeight': String(titleHeight) + "px",
        }
      },
    }
}
</script>

<style scoped>
/* アニメーションの時間指定 */
#back-cover, .book-nav-items::before, #back-cover:hover span {
  transition: all .4s;
}

/* 本体の装飾 */
.book-nav {
  font-size: 16px;
  display: -webkit-flex;
  display:         flex;
  margin: 50px;
  padding: 5px 0 1px 0;
  border: 10px solid #967848;
  background-color: #564934;
  box-shadow: 0 -1px 0 0 #bfb19c, 0 5px 2px 0 rgba(0,0,0,.4),0 1px 0 0 #443721,0 -1px 0 0 #bfb19c inset;
}
#back-cover {
  position: relative;
  list-style: none;
  display: inline-block;
  vertical-align: bottom;
  height: var(--coverHeight);
  width: var(--coverWidth);
  padding: 10px 3px 0 3px;
  transition: all .4s ;
  text-decoration: none;
}
#back-cover span {
  display: flex;
  height: var(--titleHeight);
  margin-left: auto;
  margin-right: auto;
  width: var(--titleWidth);
  word-break: break-all;
  -ms-writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: #e8e6dc;
}

.book-nav-items0 {
  border-top: 1px solid #f28279;
  border-right: 2px solid #ba3c32;
  border-bottom: 1px solid #ba3c32;
  border-left: 2px solid #f28279;
  background-color: #ea5549;
}
.book-nav-items1 {
  border-top: 1px solid #e5a77b;
  border-right: 2px solid #c45e17;
  border-bottom: 1px solid #c45e17;
  border-left: 2px solid #e5a77b;
  background-color: #e17b34;
}
.book-nav-items2 {
  border-top: 1px solid #f2df93;
  border-right: 2px solid #997b00;
  border-bottom: 1px solid #997b00;
  border-left: 2px solid #f2df93;
  background-color: #e9bc00;
}
.book-nav-items3 {
  border-top: 1px solid #50ce9d;
  border-right: 2px solid #02663f;
  border-bottom: 1px solid #02663f;
  border-left: 2px solid #50ce9d;
  background-color: #00a968;
}
.book-nav-items4 {
  border-top: 1px solid #5acec5;
  border-right: 2px solid #015952;
  border-bottom: 1px solid #015952;
  border-left: 2px solid #5acec5;
  background-color: #00a497;
}
.book-nav-items5 {
  border-top: 1px solid #3d84ba;
  border-right: 2px solid #024272;
  border-bottom: 1px solid #024272;
  border-left: 2px solid #3d84ba;
  background-color: #0068b7;
}

#back-cover::before {
  position: absolute;
  z-index: -1;
  top: 0;
  left: -2px;
  display: block;
  width: 100%;
  height: 0;
  content: '';
  background-color: #e8e6dc;
}
.book-nav-items0::before {
  border-right: 2px solid #ba3c32;
  border-left: 2px solid #f28279;
}
.book-nav-items1::before {
  border-right: 2px solid #c45e17;
  border-left: 2px solid #e5a77b;
}
.book-nav-items2::before {
  border-right: 2px solid #997b00;
  border-left: 2px solid #f2df93;
}
.book-nav-items3::before {
  border-right: 2px solid #02663f;
  border-left: 2px solid #50ce9d;
}
.book-nav-items4::before {
  border-right: 2px solid #015952;
  border-left: 2px solid #5acec5;
}
.book-nav-items5::before {
  border-right: 2px solid #024272;
  border-left: 2px solid #3d84ba;
}

/* hover時の挙動 */
#back-cover:hover {
  transform: translateY(5px) scale(1,.95);
  transform-origin: center bottom 0;
  box-shadow: 0 20px 2px 0 rgba(0,0,0,.4);
  border-left-color: rgba(0,0,0,.2);
}
#back-cover:hover::before {
  top: -10px;
  height: 11px;
}
#back-cover:hover {
  background-color: rgba(0,0,0,.3);
}
#back-cover:hover span {
  background-color: #bcbaaf;
}

/* detail.vueの位置調整 */
.detail {
  position: fixed;
  top: 200px !important;
}
</style>
