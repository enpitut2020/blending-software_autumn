// ヘッダーのためのコンポーネント

<template>
    <header>
      <v-app-bar
        app
        color="blue lighten-2"
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>検索ジャンル：</v-toolbar-title>


        <v-container
          fill-height
        >
          <v-flex xs4>
            <v-combobox
              v-model="select"
              :items="items"
              clearable
              dense
              multiple
              outlined
              small-chips
            ></v-combobox>
          </v-flex>
        </v-container>
        <v-btn v-on:click="categorySearch">検索</v-btn>

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
        select: ['日本の小説'],
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