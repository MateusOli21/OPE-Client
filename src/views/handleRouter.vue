<template>
  <v-row justify="center" align="center" style="height:500px">
    <div class="text-center">
      <v-progress-circular indeterminate="false" size="150" width="5" color="light-blue">
        Loading
      </v-progress-circular>
    </div>
  </v-row>
</template>

<script>
import * as Login from "@/services/authGoogle.js";
export default {
  name: "handleRouter",
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
