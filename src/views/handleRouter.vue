<template>
  <v-row justify="center" align="center" style="height:500px">
    <div class="text-center">
      <v-progress-circular indeterminate="false" size="150" width="5" color="light-blue">Loading</v-progress-circular>
    </div>
  </v-row>
</template>

<script>
import * as Login from "@/services/authGoogle.js";
import { constants } from "../helpers/constants";

export default {
  name: "handleRouter",
  async beforeCreate() {
    try {
      // code is used for get data of user in googleapis
      const codeInUrl = window.location.href.split("code=")[1];
      const response = await Login.getUserData(codeInUrl);
      if (response.status === constants.HTTP_CODE_SUCCESS) {
        const {
          data: { user }
        } = response;
        localStorage.setItem("userData", JSON.stringify(user));
        return user.isStudent
          ? user.groupId
            ? this.$router.push("/grupo-aluno")
            : this.$router.push("/escolhe-grupo")
          : this.$router.push("/pagina-professor");
      }
      throw new Error();
    } catch (err) {
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
