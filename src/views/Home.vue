<template>
  <v-container>
    <originalHeader />
    <cover />
    <detail />
    <history />
    <h1>ホーム画面</h1>
    <router-link to="/list">Go to List</router-link>
  </v-container>
</template>

<script>
import originalHeader from "@/components/OriginalHeader.vue";
import cover from "@/components/Cover.vue";
import detail from "@/components/Detail.vue";
import history from "@/components/History.vue";

export default {
  name: "Home",
  components: {
    originalHeader,
    cover,
    detail,
    history
  }
};
</script>