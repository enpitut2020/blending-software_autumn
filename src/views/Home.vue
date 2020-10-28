<template>
  <v-app>
    <v-container>
      <originalHeader />
      <cover />
      <detail />
      <h1>ホーム画面</h1>
      <router-link to="/list">Go to List</router-link>
    </v-container>
  </v-app>
</template>

<script>
import originalHeader from "@/components/OriginalHeader.vue";
import cover from "@/components/Cover.vue";
import detail from "@/components/Detail.vue";

export default {
  name: "Home",
  components: {
    originalHeader,
    cover,
    detail,
  }
};
</script>