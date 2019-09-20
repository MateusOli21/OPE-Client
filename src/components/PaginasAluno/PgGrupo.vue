<template>
  <div class="descricao-projeto">
    <div align="center">
      <h1>GRUPO FIT</h1>
      <h2>Projeto: Gerenciamento de grupos da OPE</h2>
      <h2>Cliente: Faculdade impacta de tecnologia</h2>
    </div>

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>

        <v-flex xs12 sm12 md6 lg6>
          <v-card>
            <v-card-title>Integrantes</v-card-title>
            <v-card height="200px" class="scroll">
            <v-card-text>
              <p>Gabriel</p>
              <p>Eduardo</p>
              <p>Mateus</p>
            </v-card-text>
            </v-card>
          </v-card>
        </v-flex>

        <v-flex xs12 sm12 md6 lg6>
          <v-card>
            <v-card-title>Descrição do projeto</v-card-title>
            <v-card height="200px" class="scroll">
              <v-card-text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae sapiente quo saepe laborum dolores,
                asperiores esse laudantium placeat alias hic?
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>

  </div>
</template>

<script>
export default {


}
</script>

<style scoped>
  .scroll {
    overflow-y: auto;
  }
</style>
