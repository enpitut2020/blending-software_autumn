// ヘッダーのためのコンポーネント

<template>
  <v-app>
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
              <v-list-item-title>HOME</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>ABOUT</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>
  </v-app>
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