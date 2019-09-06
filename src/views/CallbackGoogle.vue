<template>
  <div></div>
</template>

<script>
import * as Login from "@/services/authGoogle.js";

export default {
  async beforeCreate() {
    try {
      const code = window.location.href.split("code=")[1];
      const response = await Login.getUserData(code);
      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        this.$router.push("/escolhe-grupo");
      } else {
        this.$router.push("/");
      }
    } catch (err) {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>
