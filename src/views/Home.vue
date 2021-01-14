<template>
  <v-app>
    <v-container>
      <originalHeader />
      <heroComponent />
      <cover />
      <detail />
    </v-container>
  </v-app>
</template>

<script>
import originalHeader from "@/components/OriginalHeader.vue";
import cover from "@/components/Cover.vue";
import detail from "@/components/Detail.vue";
import heroComponent from "@/components/HeroComponent.vue";

export default {
  name: "Home",
  components: {
    originalHeader,
    cover,
    detail,
    heroComponent,
  }
};
</script>