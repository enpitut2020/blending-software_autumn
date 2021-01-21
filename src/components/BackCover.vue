<template>
    <div>
        <ul v-for="(row_items, row_key) in reshapeItems(displayItems)" :key="row_key" class="book-nav">
          <div>
          <li v-for="(item, item_key) in row_items" :key="item_key" 
          :class="assignColor(item)"
          :style="styles(item)" 
          id="back-cover" 
          @click="openDetail(item)" 
          >
            <fitty :options="fittyOptions"><template v-slot:content><span>{{ item.title }}</span></template></fitty>
          </li>
          </div>
        </ul>
    </div>
</template>

<script>
import OriginalHeader from "@/components/OriginalHeader.vue";
import Vue from 'vue';
import Fitty from 'vue-fitty' ;
// Install plugin 
Vue.use(Fitty);
var items = [
              {
                title: "メタルギア ソリッド ガンズ オブ ザ パトリオット",
                author: "伊藤 計劃",
                itemCaption:"戦争経済に支配された世界と、自らの呪われた運命からの解放のため、伝説の英雄ソリッド・スネーク最後の戦いが始まる。全世界でシリーズ2750万本を売り上げた大ヒットゲーム完結編を完全小説化!",
                largeImageUrl: require("../assets/images/メタルギア ソリッド ガンズ オブ ザ パトリオット.jpg"),
                pages: 537,
                size: "オリジナル文庫",
                publisherName: "角川書店",
                category: "日本の小説",
              },
              {
                title: "人間失格",
                author: "太宰 治",
                itemCaption:"「恥の多い生涯を送って来ました」。そんな身もふたもない告白から男の手記は始まる。男は自分を偽り、ひとを欺き、取り返しようのない過ちを犯し、「失格」の判定を自らにくだす。でも、男が不在になると、彼を懐かしんで、ある女性は語るのだ。「とても素直で、よく気がきいて(中略)神様みたいないい子でした」と。ひとがひととして、ひとと生きる意味を問う、太宰治、捨て身の問題作。",
                largeImageUrl: require("../assets/images/人間失格.jpg"),
                pages: 192,
                size: "標準文庫",
                publisherName: "新潮社",
                category: "日本の小説",
              },
              {
                title: "ソラリス",
                author: "スタニスワフ・レム",
                itemCaption:"惑星ソラリス――この静謐なる星は意思を持った海に表面を覆われていた。惑星の謎の解明のため、ステーションに派遣された心理学者ケルヴィンは変わり果てた研究員たちを目にする。彼らにいったい何が？　ケルヴィンもまたソラリスの海がもたらす現象に囚われていく……。人間以外の理性との接触は可能か？――知の巨人が世界に問いかけたＳＦ史上に残る名作。レム研究の第一人者によるポーランド語原典からの完全翻訳版。",
                largeImageUrl: require("../assets/images/ソラリス.jpg"),
                pages: 432,
                size: "特殊文庫",
                publisherName: "早川書房",
                category: '世界の小説',
              },
              {
                title: "人工知能は人間を超えるか ディープラーニングの先にあるもの",
                author: "松尾 豊",
                itemCaption:"いま、将棋やクイズ番組など「人工知能vs人間」の戦いがあちこちで起こっている。2014年の英オックスフォード大学の研究報告では、今後10年から20年ほどで、人工知能を含むITの進化の影響によって、米国の702の職業のうち約半分が失われる可能性があると述べている。",
                largeImageUrl: require("../assets/images/人工知能は人間を超えるか ディープラーニングの先にあるもの.jpg"),
                pages: 263,
                size: "B6判単行本",
                publisherName: "角川書店",
                category: '世界の小説',
              },
              {
                title: "三体",
                author: "三体",
                itemCaption:"物理学者の父を文化大革命で惨殺され、人類に絶望した中国人エリート女性科学者・葉文潔(イエ・ウェンジエ)。失意の日々を過ごす彼女は、ある日、巨大パラボラアンテナを備える謎めいた軍事基地にスカウトされる。そこでは、人類の運命を左右するかもしれないプロジェクトが、極秘裏に進行していた。",
                largeImageUrl: require("../assets/images/三体.jpg"),
                pages: 448,
                size: "四六判単行本",
                publisherName: "早川書房",
                category: '図鑑',
              },
              {
                title: "哲学と宗教全史",
                author: "出口 治明",
                itemCaption:"【ビジネス書大賞2020 特別賞(ビジネス教養部門)受賞】【全国で話題沸騰、ついに10万部突破! 11/16日経新聞掲載】池谷裕二氏、宮部みゆき氏、なかにし礼氏、入山章栄氏など各界論客から大絶賛!「読者が選ぶビジネス書グランプリ2020」総合グランプリ第6位・リベラルアーツ部門第2位!台湾、韓国からも翻訳オファー!",
                largeImageUrl: require("../assets/images/哲学と宗教全史.jpg"),
                pages: 468,
                size: "菊判単行本",
                publisherName: "その他",
                category: '図鑑',
              },
              {
                title: "生物と無生物のあいだ",
                author: "福岡 伸一",
                itemCaption:"「生命とは何か」という生命科学最大の問いに、いま分子生物学はどう答えるのか。歴史の闇に沈んだ天才科学者たちの思考を紹介しながら、現在形の生命観を探る。ページをめくる手が止まらない極上の科学ミステリー。分子生物学がたどりついた地平を平易に明かし、目に映る景色がガラリと変える!",
                largeImageUrl: require("../assets/images/生物と無生物のあいだ.jpg"),
                pages: 286,
                size: "新書",
                publisherName: "講談社",
                category: '図鑑',
              },
          ]
export default {
    components: {
    },
    data () {
        return {
          showDetail: false,
          content: "",
          fittyOptions: {
            minSize: 1,
            maxSize: 15,
            multiLine: true,
          },
          baseCoverHeight: 200,
          // 147ミリの文庫本をもとに高さ倍率を算出
          coverHightMagnification : {
            "オリジナル文庫": 1.00, 
            "標準文庫": 1.02,
            "特殊文庫": 1.06,  
            "B6判単行本": 1.24, 
            "四六判単行本": 1.28, 
            "菊判単行本": 1.50, 
            "新書": 1.24, 
          },
          coverColorType : {
            "講談社": 0,
            "集英社": 1,
            "新潮社": 2,
            "角川書店": 3,
            "早川書房": 4,
            "その他": 5,
          },
          displayItems: items,
        }
    },
    mounted: function() {
      OriginalHeader.data().bus.$on('change-category', this.displayCategoryData)
    },
    methods: {
      displayCategoryData: function(select) {
        this.select = select;
        this.displayItems = this.categoryFilter()
      },

      categoryFilter() {
        if (this.select.length === 0) {
          return items;
        }

        var selectedCategory = this.select;
        return items.filter(function (item) {
          return selectedCategory.includes(item.category)
        })
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
        return "book-nav-items" + String(this.coverColorType[item.publisherName]);
      },
      reshapeItems(items) {
        let arr = [];
        let row_arr = [];
        for (let i=0; i<items.length; i++) {
            row_arr.push(items[i]);
            if (i%10 == 9 || i == items.length-1) {
                arr.push(row_arr);
                row_arr = [];
            }
        }
        return arr;
      },
      styles(item) {
        let coverWidth = Math.floor(item.pages/4);
        let titleWidth = Math.floor(coverWidth * 0.8);
        let coverHeight = Math.floor(this.baseCoverHeight * this.coverHightMagnification[item.size])
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
