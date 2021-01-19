<template>
  <v-app>
    <v-container>
      <originalHeader />
      <heroComponent />
      <cover />
    </v-container>
  </v-app>
</template>

<script>
import originalHeader from "@/components/OriginalHeader.vue";
import cover from "@/components/Cover.vue";
import heroComponent from "@/components/HeroComponent.vue";

export default {
  name: "Home",
  components: {
    originalHeader,
    cover,
    heroComponent,
  },
};
</script>