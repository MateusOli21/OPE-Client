<template>
  <v-app>
    <template v-if=" !['home', 'handleRouter'].includes($route.name)">
      <Navbar />
    </template>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
</style>
