// ヘッダーのためのコンポーネント

<template>
    <header>
      <v-app-bar
        app
        dark
        color="brown darken-1"
      >

        <v-container
          fill-height
        >
        <v-row no-gutters>
          <v-col cols="1">
            <v-toolbar-title>ジャンル</v-toolbar-title>
          </v-col>
          <v-col cols="3">
            <v-combobox
              v-model="select"
              :items="items"
              clearable
              dense
              multiple
              outlined
              small-chips
              @change="categorySearch"
            ></v-combobox>
          </v-col>
        </v-row>
        </v-container>
        <v-switch v-model="isBackCover" @click="switchCover" :label="'背表紙モード'"></v-switch>
        <history />
      </v-app-bar>
    </header>
</template>

<script>
import Vue from 'vue';
import history from "@/components/History.vue";
const bus = new Vue();
  export default {
    data () {
      return {
        bus: bus,
        isBackCover: false,
        select: [],
        items: [
          '文庫',
          '新書',
          '小説・エッセイ',
          '人文・思想・社会',
          '美容・暮らし・健康・料理',
          '旅行・留学',
          '科学・技術',
          'ビジネス・経済・就職',
          '資格・検定',
          '語学・学習参考書',
          'パソコン・システム開発',
          '医学・薬学・看護学・歯科学',
          'エンタメ・ゲーム',
          'ホビー・スポーツ・美術',
          '絵本・児童書・図鑑',
          'ライトノベル',
          '漫画（コミック）',
          'ボーイズラブ',
          '写真集・タレント',
          'カレンダー・手帳・家計簿',
          '文具・雑貨',
          'セット本',
          '付録付き',
          'バーゲン本',
          '楽譜',
        ],
        drawer: false
      }
    },
    methods: {
      categorySearch: function() {
        bus.$emit('change-category', this.select);
      },
      switchCover() {
        bus.$emit('isBackCover', this.isBackCover)
      }
    },
    components: {
        history
    }
  }
</script>