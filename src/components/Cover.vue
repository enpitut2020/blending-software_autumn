// 書籍の表紙を表示するためのコンポーネント

<template>
<div>
  <div v-if="isBackCover">
    <BackCover :items.sync="items" :last_isbn.sync="last_isbn"/>
  </div>
  <template v-else>
  <v-main id="books">
    <v-img v-bind:class="[book_class, book_type[item.size]]" 
      v-for="(item, key) in items" :key="key" :src="item.largeImageUrl" @click="openDetail(item)"
      alt=""></v-img>
 <!--  <detail :item="content" v-show="showDetail" @close="closeDetail"/> -->
    <infinite-loading @infinite="infiniteHandler" spinner="spiral">
      <div slot="spinner" style="color:white">ロード中...</div>
      <div slot="no-more" style="color:white">もう検索データが無いよ！</div>
      <div slot="no-results" style="color:white">検索結果が無い！</div>
    </infinite-loading>
  </v-main>
  </template>
</div>
</template>

<script>
import Vue from "vue";
import Db from "@/plugins/firestoreUtils.js";
Vue.use(Db)

// import Detail from "@/components/Detail";

import OriginalHeader from "@/components/OriginalHeader.vue";
import BackCover from "@/components/BackCover.vue";
  
export default {
    components: {
      // Detail
      BackCover
    },
    data () {
        return {
          showDetail: false,
          cover_size: '',
          book_class: 'book',
          book_type: {'単行本':'size_a',
                      '文庫':'size_b',
                      '新書':'size_c',
                      '全集・双書':'size_a',
                      '事・辞典':'size_b',
                      '図鑑':'size_d',
                      '絵本':'size_d',
                      'カセット,CDなど':'size_a',
                      'コミック':'size_c',
                      'ムックその他':'size_e'},
          content: "",
          select: "",
          items: [],
          last_isbn: 0,
          isBackCover: false,
        }
    },
    created() {
      this.$getBooksData().then((books) => {
        this.items = books.data
        this.last_isbn = books.last_isbn
        //console.log(books.last_isbn)
      });
    },
    mounted: function() {
      OriginalHeader.data().bus.$on('change-category', this.categoryFilter); // カテゴリ変更があった場合に、表示済みの書籍を該当カテゴリのみの書籍にする。
      OriginalHeader.data().bus.$on('change-category', this.addData);
      OriginalHeader.data().bus.$on('isBackCover', this.switchDisplay)
    },
    methods: {
      categoryFilter () {
        // filter内の関数に用いるために変数を再度用意
        const select = select;
        if (select !== "指定しない" && select !== "") {
          this.items = this.items.filter(function(item) {
            return [select].includes(item.category);
          })
        } else {
          this.$getBooksData().then((books) => {
            this.items = books.data
            this.last_isbn = books.last_isbn
          });
        }
      },

      infiniteHandler($state) {
        const old_items_len = this.items.length
        setTimeout(() => {
          this.addData(this.select);
          $state.loaded();
        }, 1500)
        const new_items_len = this.items.length
        if (new_items_len >= 40 || (old_items_len != new_items_len &&new_items_len < old_items_len + 20)) {
          console.log("complete")
          $state.complete();
        }
      },

      addData(select) {
        const l = this.items.length
        console.log(l)
        this.select = select;
        this.$addBooksData(this.last_isbn, select).then((books) => {
            this.items = this.items.concat(books.data)
            this.last_isbn = books.last_isbn
        });  
      },

      switchDisplay: function(isBackCover) {
        this.isBackCover = isBackCover;
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
    }
}

</script>

<style scoped>
main {
    background-color: #422602;
}

.book, .book:hover {
  transition: all .4s;
}
.book {
    display: inline-block;
    width: 100px;
    height: 150px;
    padding: 10px 10px 10px 10px;
    margin: 10px 10px 10px 10px;
    background-color: #DEB887;
}

/* 単行本, 全集・双書, カセット,CDなど */
.size_a {
    width: 128px;
    height: 182px;
}

/* 文庫, 事・辞典 */
.size_b {
    width: 105px;
    height: 148px;
}

/* 新書, コミック */
.size_c {
    width: 103px;
    height: 182px;
}

/* 図鑑, 絵本 */
.size_d {
    width: 210px;
    height: 297px;
}

/* ムックその他 */
.size_e {
    width: 182px;
    height: 257px;
}

.book:hover {
    transform: scale(1.1);
}
</style>
