<template>
  <v-flex xs12 sm12 md12 lg12>
    <v-row align="center" justify="center">
      <loading :active.sync="visible" :is-full-page="fullPage"></loading>
    </v-row>
  </v-flex>
</template>

<script>
import * as Login from "@/services/authGoogle.js";
import Loading from "vue-loading-overlay"
export default {
  /* eslint-disable */
  data() {
    return {
      visible: true,
      fullPage: true
    }
  },
  props() {
    return {
      visible: true,
      fullPage: true
    }
  },
  async beforeCreate() {
    try {
      const code = window.location.href.split("code=")[1];
      const response = await Login.getUserData(code);
      if (response.status === 200) {
        console.log('deu 200')
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        this.$router.push("/escolhe-grupo");
      } else {
        this.$router.push("/");
      }
    } catch (err) {
      this.$router.push("/");
    }
  },
  components: {
    Loading
  }
};
</script>

<style scoped>
</style>
