// 書籍の表紙を表示するためのコンポーネント

<template>
  <v-main id="books">
    <div infinite-wrapper>
    <v-img v-bind:class="{book: isBook, size_s: item.isSizeS, size_m: item.isSizeM, size_l: item.isSizeL, size_hover: item.isSizeHover}" 
      v-for="(item, key) in items" :key="key" :src="item.largeImageUrl" @click="openDetail(item)"
      alt=""></v-img>
    <detail :item="content" v-show="showDetail" @close="closeDetail"/>
    <infinite-loading @infinite="infiniteHandler" spinner="spiral">
      <div slot="spinner">ロード中...</div>
      <div slot="no-more">もう検索データが無いよ！</div>
      <div slot="no-results">検索結果が無い！</div>
    </infinite-loading>
    </div>
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
          isBook: true,
          content: "",
          select: [],
          items: [],
          displayItems: items,
        }
    },
    created() {
      this.$getBooksData().then((books) => {
        this.items = books
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
        if (old_items_len == new_items_len) {
          console.log("complete")
          $state.complete();
        }
      },

      addData() {
        const l = this.items.length
        console.log(l)
        this.$addBooksData(this.items[l-1]).then((books) => {
          this.items = this.items.concat(books)
        });
      },

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

.size_s {
    width: 100px;
    height: 150px;
}

.size_m {
    width: 150px;
    height: 200px;
}

.size_l {
    width: 200px;
    height: 300px;
}

.book:hover {
    transform: scale(1.1);
}
</style>
