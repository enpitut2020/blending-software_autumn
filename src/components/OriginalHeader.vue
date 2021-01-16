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
          '日本の小説',
          '世界の小説',
          '図鑑',
          '絵本',
        ],
        drawer: false
      }
    },
    methods: {
      categorySearch: function() {
        console.log(bus.$on)
        bus.$emit('change-category', this.select);
      },
      switchCover() {
        if (this.isBackCover) {
          this.$emit("currentView", "backcover");
        }
        else {
          this.$emit("currentView", "cover");
        }

      }
    },
    components: {
        history
    }
  }
</script>