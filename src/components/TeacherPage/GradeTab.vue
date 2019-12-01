<template>
  <v-container class="grey lighten-5 grade">
    <v-row no-gutters>
      <v-col sm="12">
        <v-card>
          <v-card-title class="title">Critérios de Avaliação</v-card-title>
          <v-container class="lighten-5">
            <v-row no-gutters class="center-x-col">
              <div class="criteria-container">
                <v-text-field outlined label="Critério" prepend-icon="mdi-playlist-check" required></v-text-field>
                <v-text-field
                  outlined
                  label="Peso"
                  prepend-icon="mdi-weight-kilogram"
                  required
                  :rules="[() => groupName.length > 0 || 'Campo obrigatório']"
                ></v-text-field>
              </div>
            </v-row>
            <v-row class="center-x-col my-5">
              <v-btn fab small dark color="indigo">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
</script>

<style lang="scss">
.grade {
  font-family: Roboto, sans-serif !important;
  font-weight: 400 !important;
}

.criteria-container {
  padding: 40px 40px 10px 20px;
  width: 60%;
  border: 1.4px dashed grey;
}

.center-x-col {
  display: flex;
  justify-content: center;
}

.title {
  margin-top: 10px;
  margin-left: 10px !important;
  font-size: 1.25rem !important;
  font-weight: 500 !important;
}
</style>