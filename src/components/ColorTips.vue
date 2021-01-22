<template>
<v-tooltip
v-model="show"
top>
    <template v-slot:activator="{ on, attrs }">
        <v-btn
            icon
            v-bind="attrs"
            v-on="on">
            <v-icon large color="blue darken-2">
            mdi-help-circle
            </v-icon>
        </v-btn>
    </template>
    <span>
        <div>
        <v-icon color="#ea5549">
            mdi-checkbox-blank-circle
        </v-icon>
        <span>文庫, 小説・エッセイ</span>
        </div>
        <div>
        <v-icon color="#e17b34">
            mdi-checkbox-blank-circle
        </v-icon>
        <span>新書, 人文・思想・社会, ビジネス・経済・就職, 資格・検定, 語学・学習参考書</span>
        </div>
        <div>
        <v-icon color="#e9bc00">
            mdi-checkbox-blank-circle
        </v-icon>
        <span>美容・暮らし・健康・料理, 旅行・留学・アウトドア, エンタメ・ゲーム, ホビー・スポーツ・美術, 絵本・児童書・図鑑</span>
        </div>
        <div>
        <v-icon color="#00a968">
            mdi-checkbox-blank-circle
        </v-icon>
        <span>科学・技術, パソコン・システム開発, 医学・薬学・看護学・歯科学</span>
        </div>
        <div>
        <v-icon color="#00a497">
            mdi-checkbox-blank-circle
        </v-icon>
        <span>ライトノベル, 漫画（コミック）, ボーイズラブ, 写真集・タレント</span>
        </div>
        <div>
        <v-icon color="#0068b7">
            mdi-checkbox-blank-circle
        </v-icon>
        <span>カレンダー・手帳・家計簿, 文具・雑貨, セット本, 付録付き, バーゲン本, 楽譜</span>
        </div>
    </span>
</v-tooltip>
</template>

<script>
  export default {
    data () {
      return {
        show: false,
      }
    },
  }
</script>