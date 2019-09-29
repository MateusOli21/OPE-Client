<template>
  <v-row justify="center" align="center" style="height:500px">
    <div class="text-center">
      <v-progress-circular indeterminate="false" size="150" width="5" color="light-blue">Carregando</v-progress-circular>
    </div>
  </v-row>
</template>

<script>
import * as Login from "@/services/AuthApi.js";

export default {
  name: "HandleRouter",
  async beforeCreate() {
    try {
      // code is used for get data of user in googleapis
      const codeInUrl = window.location.href.split("code=")[1];
      const response = await Login.getUserData(codeInUrl);
      const {
        data: { user }
      } = response;
      localStorage.setItem("userData", JSON.stringify(user));
      return user.isStudent
        ? user.groupId
          ? this.$router.push("/grupo-aluno")
          : this.$router.push("/escolhe-grupo")
        : this.$router.push("/pagina-professor");
    } catch (err) {
      let text = "Ocorreu um erro em nosso servidor, pedimos desculpas.";
      if (err.message.includes("403")) {
        text = "Você não tem permissão para acessar essa aplicação.";
      }
      this.$swal.fire({
        type: "error",
        title: "Erro",
        text
      });
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>
