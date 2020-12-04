// 書籍の表紙を表示するためのコンポーネント

<template>
        <v-main id="books">
          <v-img v-bind:class="{book: isBook, size_s: item.isSizeS, size_m: item.isSizeM, size_l: item.isSizeL, size_hover: item.isSizeHover}" 
            v-for="(item, key) in categoryItems" :key="key" :src="item.img_path" @click="openDetail(item)"
            alt=""></v-img>
            <detail :item="content" v-show="showDetail" @close="closeDetail"/>
        </v-main>
</template>

<script>
import Detail from "@/components/Detail";
import OriginalHeader from "@/components/OriginalHeader.vue";
export default {
    components: {
      Detail
    },
    data () {
        return {
          showDetail: false,
          isBook: true,
          content: "",
            items: [
            ]
        }
    },
    methods: {

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
    width: 150px;
    height: 200px;
}

.size_m {
    width: 200px;
    height: 300px;
}

.size_l {
    width: 300px;
    height: 500px;
}

.book:hover {
    width: 350px;/*150px;*/
    height: 550px;/*200px;*/
}
</style>