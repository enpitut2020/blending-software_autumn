<template>
  <v-app>
    <v-container>
      <originalHeader></originalHeader>
      <heroComponent />
      <cover />
      <detail />
      <futter />
    </v-container>
  </v-app>
</template>

<script>
import originalHeader from "@/components/OriginalHeader.vue";
import cover from "@/components/Cover.vue";
import detail from "@/components/Detail.vue";
import heroComponent from "@/components/HeroComponent.vue";
import futter from "@/components/Futter.vue";

export default {
  name: "Home",
  components: {
    originalHeader,
    cover,
    detail,
    heroComponent,
    futter,
  },
};
</script>