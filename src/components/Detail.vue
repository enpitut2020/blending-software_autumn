<template>
    <div class="detail" id="overlay" v-if="item" @click.self="$emit('close')">
      <v-layout wrap @click.self="$emit('close')">

      <!-- モーダルの幅はmax-widthで決定してる       -->
      <v-card class="mx-auto my-12" max-width=700 >

        <!-- 画像へのパス -->
        <v-img class="book" :src="item.largeImageUrl">
        </v-img>

        <v-divider></v-divider>

        <v-card-title>
          <!-- タイトル -->
          {{ item.title }}
          <v-card-subtitle align="left">
            <!-- 著者  -->
            {{ item.author }}
          </v-card-subtitle>
        </v-card-title>

        <!-- アマゾンとかへのリンク -->
        <!--
         <v-chip-group column >
            <v-chip>あまぞん</v-chip>
            <v-chip>らくてん</v-chip>
            <v-chip>としょかん</v-chip>
        </v-chip-group>
        -->

        <!-- あらすじ -->
<!--        <h1 v-show="foldingitemCaption">-->
<!--          <v-card-text align="left" class="">-->
<!--            {{ item.itemCaption | truncate }}<v-btn class="" text @click="showFullitemCaption">MORE</v-btn>-->
<!--          </v-card-text>-->
<!--        </h1>-->
<!--        <h1 v-else>-->
          <v-card-text align="left">
            {{ item.itemCaption }} <v-btn text @click="closeFullitemCaption">
<!--            LESS-->
          </v-btn>
          </v-card-text>
<!--        </h1>-->

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text @click="$emit('close')" >
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: ['item'],
  /*
    変数itemでCover.vueでクリックされた本の情報が渡される
      title: タイトル
      author: 著者
      itemCaption: あらすじ
      largeImageUrl: 画像へのリンク
   */
  data: () => ({
    foldingitemCaption: true,
  }),
  // FIXME: Convert into computed
  methods: {
    // あらすじをすべて表示するか．
    showFullitemCaption() {
      this.foldingitemCaption = false;
    },
    closeFullitemCaption() {
      this.foldingitemCaption = true;
    },
  },
  filters: {
    // あらすじを適当な文字数に
    truncate: function (itemCaption) {
      return itemCaption.substr(0, 50) + "...";
    }
  }
}
</script>

<style>
#overlay {
  z-index: 1;
  position: fixed;
  top: 150px;
  left: 0;
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book {
  display: inline-block;
  width: 200px;
  height: 270px;
}
</style>