<template>
  <div class="landing-page">
    <v-container class="fill-height">
      <v-flex xs12 sm12 md12 lg12>
        <v-row align="center" justify="center">
          <v-img src="@/assets/logo-impacta3.png" class="estilo-imagem mb-10"></v-img>
        </v-row>

        <v-row align="center" justify="center" style>
          <v-card class="estilo-card pa-5 mt-12" color="indigo lighten-4">
            <v-card-actions>
              <v-btn block dark class color="indigo darken-1" :href="url">Login com Google</v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import { getGoogleURL } from "../services/AuthApi";

export default {
  name: "LoginPage",
  data() {
    return {
      url: ""
    };
  },
  async beforeCreate() {
    try {
      const {
        data: { googleUrl }
      } = await getGoogleURL();
      this.url = googleUrl;
    } catch (err) {
      this.$swal.fire({
        type: "error",
        title: "Oops...",
        showCloseButton: true,
        showConfirmButton: false,
        timer: 5000,
        text:
          "Tivemos um problema ao conectar com o Google, por favor, tente novamente mais tarde.",
        footer: `<small>Erro: ${err}</small>`
      });
    }
  }
};
</script>

<style scoped>
.landing-page {
  background-color: #eeeeee;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.estilo-imagem {
  max-width: 450px;
  max-height: 300px;
}

.estilo-card {
  width: 350px;
  height: 90px;
  max-width: 400px;
  max-height: 150px;
}
</style>
