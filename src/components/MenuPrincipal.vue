<template>
  <!-- fazer o menu responsivo-->
  <div class="menu">
    <template>
      <v-container class="grey lighten-5" mt-5 mb-3>
        <v-row no-gutters align="center">
          <v-col v-for="(menu, index) in menuItem" :key="index" cols="12" sm="4">
            <!-- adicionar onClick  para as respectivas paginas pagina -->
            <v-btn block text large>{{ menu.nome }}</v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-container>
      <div class="to-right">
        <v-btn color="info" v-if="isGropDetais" @click="backToHome" to="/pagina-professor" fab small dark>
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isGropDetais: !!localStorage.getItem("groupDetails"),
      menuItem: [{ nome: "Grupo" }, { nome: "Sprint" }, { nome: "Notas" }]
    };
  },
  methods: {
    backToHome(){
      localStorage.removeItem("groupDetails")
    }
  }
};
</script>

<style scoped>
.to-right {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}
</style>
