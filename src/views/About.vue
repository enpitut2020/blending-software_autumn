<template>
  <v-app>
    <v-container>
      <originalHeader />
      <backcover />
    </v-container>
  </v-app>
</template>

<script>
import originalHeader from "@/components/OriginalHeader";
import backcover from "@/components/BackCover";

export default {
  name: "About",
  components: {
    originalHeader,
    backcover
  }
}
</script>
