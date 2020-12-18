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
<!--        <h1 v-show="foldingSummary">-->
<!--          <v-card-text align="left" class="">-->
<!--            {{ item.summary | truncate }}<v-btn class="" text @click="showFullSummary">MORE</v-btn>-->
<!--          </v-card-text>-->
<!--        </h1>-->
<!--        <h1 v-else>-->
          <v-card-text align="left">
            {{ item.itemCaption }} <v-btn text @click="closeFullSummary">
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
      summary: あらすじ
      largeImageUrl: 画像へのリンク
   */
  data: () => ({
    foldingSummary: true,
  }),
  // FIXME: Convert into computed
  methods: {
    // あらすじをすべて表示するか．
    showFullSummary() {
      this.foldingSummary = false;
    },
    closeFullSummary() {
      this.foldingSummary = true;
    },
  },
  filters: {
    // あらすじを適当な文字数に
    truncate: function (summary) {
      return summary.substr(0, 50) + "...";
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