<template>
  <v-app>
    <v-container>
      <originalHeader />
      <heroComponent />
      <backcover />
      <detail />
    </v-container>
  </v-app>
</template>

<script>
import originalHeader from "@/components/OriginalHeader";
import backcover from "@/components/BackCover";
import heroComponent from "@/components/HeroComponent";
import Detail from "@/components/Detail";

export default {
  name: "About",
  components: {
    Detail,
    originalHeader,
    backcover,
    heroComponent,
  }
}
</script>
