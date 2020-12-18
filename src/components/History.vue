// 履歴を表示するためのコンポーネント

<template>
  <div>
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
                @click="openDetail(item)"
                >
                {{ item.title }}
                </v-list-item>
            </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>
    <detail :item="content" v-show="showDetail" @close="closeDetail"/>
  </div>
</template>


<script>
import Detail from "@/components/Detail";

  export default {
    components: {
      Detail
    },
    data: () => ({
      selectedItem: 0,
      showDetail: false,
      content: "",
      items: [
      ],
      dialog: false,
    }
    ),
    methods: {
      openDetail(item) {
        this.showDetail = true
        this.dialog = false
        this.content = item
      },

      closeDetail() {
        this.showDetail = false
      }
    }
  }
</script>

<style scoped>
/* detail.vueの位置調整 */
.detail {
  position: fixed;
  top: 380px !important;
}
</style>
