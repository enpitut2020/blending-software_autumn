// 履歴を表示するためのコンポーネント

<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on">
            <v-icon color="grey lighten-1">
                mdi-clock-outline
            </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          履歴
        </v-card-title>
        <v-list dense>
            <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :href=item.link
                >
                {{ item.text }}
                </v-list-item>
            </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
  export default {
    data: () => ({
      selectedItem: 0,
      items: [
        { text: '虐殺器官', link: 'https://www.amazon.co.jp/%E8%99%90%E6%AE%BA%E5%99%A8%E5%AE%98-%E3%83%8F%E3%83%A4%E3%82%AB%E3%83%AF%E6%96%87%E5%BA%ABJA-%E4%BC%8A%E8%97%A4-%E8%A8%88%E5%8A%83/dp/4150309841'},
        { text: 'ハーモニー', link: 'https://www.amazon.co.jp/%E3%83%8F%E3%83%BC%E3%83%A2%E3%83%8B%E3%83%BC-%E3%83%8F%E3%83%A4%E3%82%AB%E3%83%AF%E6%96%87%E5%BA%ABJA-%E4%BC%8A%E8%97%A4-%E8%A8%88%E5%8A%83-ebook/dp/B009DEMA1Q/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=%E3%83%8F%E3%83%BC%E3%83%A2%E3%83%8B%E3%83%BC&qid=1603450088&s=books&sr=1-1'},
        { text: '屍者の帝国', link: 'https://www.amazon.co.jp/%E5%B1%8D%E8%80%85%E3%81%AE%E5%B8%9D%E5%9B%BD-%E6%B2%B3%E5%87%BA%E6%96%87%E5%BA%AB-%E4%BC%8A%E8%97%A4%E8%A8%88%E5%8A%83-ebook/dp/B00PQDJM3C/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=%E5%B1%8D%E8%80%85%E3%81%AE%E5%B8%9D%E5%9B%BD&qid=1603450109&s=books&sr=1-1'},
      ],
      dialog: false,
    }),
  }
</script>
