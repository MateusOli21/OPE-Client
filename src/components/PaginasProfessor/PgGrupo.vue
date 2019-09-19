<template>
  <div class="form-busca-grupo">
    <v-container>
      <v-layout>
        <v-flex>
          <v-row justify="center">
          <v-card width="500px" max-height="550px" class="px-8 py-4">
            <v-card-title>Procure um grupo</v-card-title>
            <v-card-text>
              <v-autocomplete label="Nome do grupo"></v-autocomplete>
              <v-text-field label="Período"></v-text-field>
              <v-text-field label="Curso"></v-text-field>
              <v-text-field label="Semestre"></v-text-field>
              <v-text-field label="Turma"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <!-- ao clicar no botão um modal pode aparece para mostrar a lista de grupos filtrada -->
              <v-btn depressed block dark color="indigo darken-1" class="mt-2 mb-2">Filtrar</v-btn>
            </v-card-actions>
          </v-card>
          </v-row>
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

</style>
