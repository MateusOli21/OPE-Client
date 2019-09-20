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
  name: "handleRouter",
  data() {
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
        const { user } = response.data;
        localStorage.setItem("userData", JSON.stringify(user));
        if (user.isStudent) {
          if (user.groupId) {
            return this.$router.push("/grupo-aluno");
          } else return this.$router.push("/escolhe-grupo");
        } else if (!user.isStudent) return this.$router.push("/pagina-professor");
      } else return this.$router.push("/");
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
