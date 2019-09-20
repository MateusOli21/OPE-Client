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
    </template>

  </div>
</template>

<script>
export default {
  data(){
    return{
      menuItem : [
        {nome: 'Grupo'},
        {nome: 'Sprint'},
        {nome: 'Notas'}
      ]
    }
  }

}
</script>

<style scoped>

</style>
