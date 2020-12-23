// ヘッダーのためのコンポーネント

<template>
    <header>
      <v-app-bar
        app
        dark
        color="brown darken-1"
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

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
        <history />
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group>
            <v-list-item>
              <v-list-item-title><router-link to="/">HOME</router-link></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title><router-link to="/about">ABOUT</router-link></v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
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
      }
    },
    components: {
        history
    }
  }
</script>