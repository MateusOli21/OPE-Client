<template>
  <div class="criteria-container">
    <v-text-field
      outlined
      label="Critério"
      prepend-icon="mdi-playlist-check"
      :rules="[() => groupName.length > 0 || 'Campo obrigatório']"
      required
    ></v-text-field>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-text-field
          outlined
          label="Peso"
          prepend-icon="mdi-weight-kilogram"
          required
          v-on="on"
          :rules="[() => groupName.length > 0 || 'Campo obrigatório']"
        ></v-text-field>
      </template>
      <span>O peso deve ser de 1 à 100</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: {
      criteria: String,
      weight: Number
  }
};
</script>

<style lang="scss">
.criteria-container {
  padding: 40px 40px 10px 20px;
  width: 60%;
  border: 1.4px dashed grey;
  margin-bottom: 20px;
}
</style>