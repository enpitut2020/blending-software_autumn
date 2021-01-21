<template>
  <v-app>
    <v-container>
      <originalHeader v-on:currentView="currentView = $event"></originalHeader>
      <heroComponent />
      <div class="content">
        <component :is="currentView"></component>
      </div>
      <futter />
    </v-container>
  </v-app>
</template>

<script>
import originalHeader from "@/components/OriginalHeader.vue";
import cover from "@/components/Cover.vue";
import backcover from "@/components/BackCover.vue";
import heroComponent from "@/components/HeroComponent.vue";
import futter from "@/components/Futter.vue";

export default {
  name: "Home",
  components: {
    originalHeader,
    cover,
    backcover,
    heroComponent,
    futter,
  },
  data() {
    return {
      currentView: "cover",
    }
  },
};
</script>