<template>
  <v-row justify="center" align="center" style="height:500px">
    <div class="text-center">
      <v-progress-circular indeterminate="false" size="150" width="5" color="light-blue">Carregando</v-progress-circular>
    </div>
  </v-row>
</template>

<script>
import { getGoogleUserData } from "../services/AuthApi";
import * as LocalForage from "../services/LocalForage";
import { showError } from "../helpers/sweetAlert";

const getCorrectPathAccordingGoogleUserData = ({ isStudent, groupId }) => {
  let path = "/";
  if (isStudent && groupId) {
    path = "/grupo-aluno";
  } else if (isStudent && !groupId) {
    path = "/escolhe-grupo";
  } else if (!isStudent) {
    path = "/pagina-professor";
  }
  return path;
};

export default {
  name: "RedirectorLoaderPage",
  async beforeCreate() {
    let googleUserData;
    try {
      const codeOfGoogleInUrl = window.location.href.split("code=")[1];
      const setCodeInLocalForage = async code =>
        await LocalForage.setItem("code", code);
      const storeGoogleUserData = async googleUserData =>
        await LocalForage.setObject(
          "googleUserData",
          JSON.stringify(googleUserData)
        );
      const user = await LocalForage.getGoogleUserData();

      if (!(await LocalForage.has("code"))) {
        await setCodeInLocalForage(codeOfGoogleInUrl);
        const response = await getGoogleUserData(codeOfGoogleInUrl);
        googleUserData = response.data.user;
        await storeGoogleUserData(googleUserData);
      }

      if (!(await LocalForage.has("googleUserData")))
        throw new Error("Não foi possível conectar a sua conta Google.");

      let actualUser = googleUserData || JSON.parse(user);

      const path = getCorrectPathAccordingGoogleUserData(actualUser);
      return this.$router.push(path);
    } catch (err) {
      await LocalForage.clearStorage();
      const self = this;
      if (err.response && err.response.status === 403) {
        showError(
          self,
          err,
          "Você não tem autorização para acessar essa plataforma."
        );
      } else {
        showError(
          self,
          err,
          "Tivemos um problema no redirecionamento, por favor, tente novamente mais tarde."
        );
      }
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>
