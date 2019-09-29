<template>
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

</template>


<script>
import * as Login from "@/services/AuthApi.js";

export default {
  name: "CardLogin",
  data() {
    return {
      url: ""
    };
  },
  async beforeCreate() {
    try {
      const {
        data: { googleUrl }
      } = await Login.getGoogleURL();
      this.url = googleUrl;
    } catch (err) {
      this.$swal('Não foi possível pegar a URL do Google');
    }
  }
};
</script>


<style scoped>
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
