<template>
  <v-btn color="info" @click="backToHome" to="/pagina-professor" fab small dark>
    <v-icon>mdi-arrow-right</v-icon>
  </v-btn>
</template>

<script>

export default {
  methods: {
    backToHome() {
      localStorage.removeItem("groupDetails");
    }
  }
};
</script>
