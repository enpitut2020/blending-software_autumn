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
            <v-toolbar-title>検索ジャンル：</v-toolbar-title>
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
import history from "@/components/History.vue";
  export default {
    data () {
      return {
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
    components: {
        history
    }
  }
</script>