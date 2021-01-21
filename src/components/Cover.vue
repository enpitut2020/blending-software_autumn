// 書籍の表紙を表示するためのコンポーネント

<template>
  <v-main id="books">
    <v-img v-bind:class="[book_class, book_type[item.size]]" 
      v-for="(item, key) in displayItems" :key="key" :src="item.largeImageUrl" @click="openDetail(item)"
      alt=""></v-img>
    <detail :item="content" v-show="showDetail" @close="closeDetail"/>
    <infinite-loading @infinite="infiniteHandler" spinner="spiral">
      <div slot="spinner">ロード中...</div>
      <div slot="no-more">もう検索データが無いよ！</div>
      <div slot="no-results">検索結果が無い！</div>
    </infinite-loading>
  </v-main>
</template>

<script>
import Vue from "vue";
import Db from "@/plugins/firestoreUtils.js";
Vue.use(Db)

import Detail from "@/components/Detail";
import OriginalHeader from "@/components/OriginalHeader.vue";
var items = [];
  
export default {
    components: {
      Detail
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
          select: [],
          items: [],
          last_isbn: 0,
          displayItems: items,
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
      OriginalHeader.data().bus.$on('change-category', this.displayCategoryData)
    },
    methods: {
      infiniteHandler($state) {
        const old_items_len = this.items.length
        setTimeout(() => {
          this.addData()
          $state.loaded();
        }, 1500)
        const new_items_len = this.items.length
        if (old_items_len != new_items_len &&new_items_len < old_items_len + 20) {
          console.log("complete")
          $state.complete();
        }
      },

      addData() {
        const l = this.items.length
        console.log(l)
        this.$addBooksData(this.last_isbn).then((books) => {
          this.items = this.items.concat(books.data)
          this.last_isbn = books.last_isbn
        });
        this.displayCategoryData(this.select);
      },

      displayCategoryData: function(select) {
        this.select = select;
        this.displayItems = this.categoryFilter();
      },

      categoryFilter() {
        if (this.select.length === 0) {
          return this.items;
        }

        var selectedCategory = this.select;
        return this.items.filter(function (item) {
          return (selectedCategory.includes(item.category))// || selectedCategory.includes(item.subcategory))
        });
      },

      openDetail(item) {
        this.showDetail = true
        this.content = item
      },

      closeDetail() {
        this.showDetail = false
      },
    },
    computed: {
      categoryItems: function() {
        return this.items.filter(function (item) {
          return OriginalHeader.data().select.includes(item.category)
        })
      }
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
