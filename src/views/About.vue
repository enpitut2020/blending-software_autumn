<template>
  <v-app>
    <v-container>
      <originalHeader />
      <heroComponent />
      <backcover />
    </v-container>
  </v-app>
</template>

<script>
import originalHeader from "@/components/OriginalHeader";
import backcover from "@/components/BackCover";
import heroComponent from "@/components/HeroComponent";

export default {
  name: "About",
  components: {
    originalHeader,
    backcover,
    heroComponent,
  }
}
</script>
