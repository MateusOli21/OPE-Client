<template>
  <v-row justify="center" align="center" style="height:500px">
    <div class="text-center">
      <v-progress-circular indeterminate="false" size="150" width="5" color="light-blue">Carregando</v-progress-circular>
    </div>
  </v-row>
</template>

<script>
import { getGoogleUserData } from "../services/AuthApi";
import * as LocalStorage from "../services/LocalStorage";
import { showError } from "../errors/sweetAlertError";

const hasCodeInLocalStorage = LocalStorage.getItem("code");
const setCodeInLocalStorage = code => LocalStorage.setItem("code", code);
const storeGoogleUserData = googleUserData =>
  LocalStorage.setObject("googleUserData", googleUserData);
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

      if (!hasCodeInLocalStorage) {
        setCodeInLocalStorage(codeOfGoogleInUrl);
        const response = await getGoogleUserData(codeOfGoogleInUrl);
        googleUserData = response.data.user;
        storeGoogleUserData(googleUserData);
      }

      if (!LocalStorage.has("googleUserData"))
        throw new Error("Não foi possível conectar a sua conta Google.");

      const path = getCorrectPathAccordingGoogleUserData(googleUserData);
      return this.$router.push(path);
    } catch (err) {
      LocalStorage.clearStorage();
      const self = this;
      showError(
        self,
        err,
        "Tivemos um problema no redirecionamento, por favor, tente novamente mais tarde."
      );
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>
