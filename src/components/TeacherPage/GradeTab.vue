<template>
  <v-container class="grey lighten-5 grade">
    <v-row no-gutters>
      <v-col sm="12">
        <v-card>
          <v-card-title class="title">Critérios de Avaliação</v-card-title>
          <v-container class="lighten-5">
            <v-row no-gutters class="center-x-col">
              <CriteriaContainer v-for="criteria in criterias" :key="criteria" />
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
import CriteriaContainer from "./CriteriaContainer";

export default {
  data() {
    return {
      criterias: [
        {
          criteria: "",
          weight: ""
        }
      ]
    };
  },
  components: {
    CriteriaContainer
  },
  methods: {
    createAnotherCriterion() {}
  }
};
</script>

<style lang="scss">
.grade {
  font-family: Roboto, sans-serif !important;
  font-weight: 400 !important;
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