<template>
  <v-container class="grey lighten-5 grade">
    <v-row no-gutters>
      <v-col sm="12">
        <v-card class="mt-3">
          <div class="space-between">
            <v-card-title class="title">Critérios de Avaliação</v-card-title>
            <v-btn
              color="indigo darken-1"
              class="save-criterias"
              :disabled="hasRequiredFieldsVoid"
              @click="saveCriterias"
              :loading="isLoading"
            >Salvar</v-btn>
          </div>
          <v-container class="lighten-5">
            <v-row no-gutters class="center-x-col" v-for="criteria in criterias" :key="criteria.id">
              <div class="criteria-container">
                <v-text-field
                  outlined
                  label="Critério"
                  prepend-icon="mdi-playlist-check"
                  v-model="criteria.name"
                  required
                ></v-text-field>
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      outlined
                      label="Peso"
                      v-model="criteria.weight"
                      prepend-icon="mdi-weight-kilogram"
                      v-on:keypress="isNumber($event, criteria.weight)"
                      required
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <span>O peso deve ser de 1 à 100</span>
                </v-tooltip>
              </div>
            </v-row>
            <v-row class="center-x-col my-5">
              <v-btn fab small dark color="indigo" @click="createAnotherCriterion">
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
import { upsertCriterias, getCriterias } from "../../services/GradeApi";

export default {
  async beforeCreate() {
    const { data } = await getCriterias();
    this.criterias = data
  },
  data() {
    return {
      criterias: [
        {
          name: "",
          weight: ""
        }
      ],
      isLoading: false
    };
  },
  computed: {
    hasRequiredFieldsVoid() {
      if (this.criterias.length) {
        return (
          this.criterias.some(field => !field.name || !field.weight) ||
          !(
            this.criterias.reduce(
              (accumulator, currentField) =>
                accumulator + Number(currentField.weight),
              0
            ) === 100
          )
        );
      }
      return true
    }
  },
  methods: {
    createAnotherCriterion() {
      const myCriteria = {
        name: "",
        weight: ""
      };
      this.criterias.push(myCriteria);
    },
    async saveCriterias() {
      this.isLoading = true
      await upsertCriterias(this.criterias);
      setTimeout(() => this.isLoading = false, 1000)
    },
    isNumber(evt, value) {
      evt = evt ? evt : window.event;
      const charCode = evt.which ? evt.which : evt.keyCode;
      const myValue = value + evt.key;
      if (
        (charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          charCode !== 46) ||
        (Number(myValue) > 100 || Number(myValue) < 1)
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
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
  margin-top: 40px !important;
  margin-left: 30px !important;
  font-size: 1.25rem !important;
  font-weight: 500 !important;
}

.space-between {
  display: flex;
  justify-content: space-between;
}

.save-criterias {
  color: white !important;
  margin: 50px 40px 0 0;
  width: 14%;
}

.criteria-container {
  padding: 40px 40px 10px 20px;
  width: 60%;
  border: 1.4px dashed grey;
  margin-bottom: 20px;
}
</style>