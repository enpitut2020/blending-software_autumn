<template>
  <v-app>
    <v-container>
      <originalHeader />
      <cover />
      <detail />
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