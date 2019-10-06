<template>
  <v-row justify="center" align="center" style="height:500px">
    <div class="text-center">
      <v-progress-circular indeterminate="false" size="150" width="5" color="light-blue">Loading</v-progress-circular>
    </div>
  </v-row>
</template>

<script>
/* eslint-disable */
import { getUserData } from "../services/AuthApi";

export default {
  name: "handleRouter",
  async beforeCreate() {
    try {
      // code is used for get data of user in googleapis
      const codeInUrl = window.location.href.split("code=")[1];
      if (!localStorage.getItem("code")) {
        localStorage.setItem("code", codeInUrl);
        const response = await getUserData(codeInUrl);
        localStorage.setItem("response", JSON.stringify(response.data.user));
      }
      const user = JSON.parse(localStorage.getItem("response"));
      if (user && user.email) {
        let path = "/";
        localStorage.setItem("userData", JSON.stringify(user));
        if (user.isStudent && user.groupId) {
          path = "/grupo-aluno";
        } else if (user.isStudent && !user.groupId) {
          path = "/escolhe-grupo";
        } else if (!user.isStudent) {
          path = "/pagina-professor";
        }
        return this.$router.push(path);
      } else {
        localStorage.clear();
        this.$swal.fire({
          type: "error",
          title: "Erro",
          text:
            "Não foi possível se conectar a sua conta Google, por favor, tente novamente mais tarde."
        });
        return this.$router.push("/");
      }
    } catch (err) {
      console.log("err:", err);
      localStorage.clear();
      this.$swal.fire({
        type: "error",
        title: "Erro",
        text: "Você não tem permissão para acessar essa aplicação."
      });
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>