// 書籍の表紙を表示するためのコンポーネント

<template>
        <v-main id="books">
         <v-img class="book" v-for="(item, key) in items" :key="key" :src="item.img_path" @click="openDetail(item)"
                alt=""></v-img>
            <detail :item="content" v-show="showDetail" @close="closeDetail"/>
        </v-main>
</template>

<script>
import Detail from "@/components/Detail";

export default {
    components: {
      Detail
    },
    data () {
        return {
          showDetail: false,
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
      }
    }
}
</script>

<style scoped>
main {
    background-color: #422602;
}

.book {
    display: inline-block;
    width: 100px;
    height: 150px;
    padding: 10px 10px 10px 10px;
    margin: 10px 10px 10px 10px;
    background-color: #DEB887;
}
.book:hover {
    width: 150px;
    height: 200px;
}
</style>