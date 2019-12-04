<template>
  <v-dialog v-model="dialog" width="45%">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="indigo lighten-2" class="bottom-5" small dark>Atribuir nota</v-btn>
    </template>

    <v-card class="bg-color-default">
      <v-card-title class="card-title">Atribuir Nota</v-card-title>
      <v-divider></v-divider>
      <v-container class="grey lighten-5">
        <v-row v-for="criteria in criterias" :key="criteria.key" class="d-flex center" no-gutters>
          <v-card class="box-shadow-none w-80p bg-color-transparent">
            <label :for="criteria.name">{{criteria.name}}</label>
            <v-text-field
              v-on:keypress="isNumber($event, criteria.grade)"
              required
              outlined
              solo="true"
              :label="criteria.name"
              :name="criteria.name"
              v-model="criteria.grade"
            ></v-text-field>
          </v-card>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions class="d-flex center">
        <v-btn
          color="indigo darken-1"
          class="confirm-button"
          :disabled="hasRequiredFieldsVoid"
          @click="giveGrade"
          :loading="isLoading"
          large
        >Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getCriterias, setGroupGrade } from "../../services/GradeApi";
import { showError } from "../../helpers/sweetAlert";
import { getGoogleUserData } from "../../services/LocalForage";

export default {
  async beforeMount() {
    const self = this;
    try {
      const { data: criterias } = await getCriterias();
      const user = await getGoogleUserData();
      this.user = JSON.parse(user);
      this.criterias = criterias.length
        ? criterias.map(criteria => {
            return {
              name: criteria.name,
              grade: criteria.grade,
              weight: criteria.weight
            };
          })
        : [];
    } catch (err) {
      showError(
        self,
        err,
        "Ocorreu um erro ao com o componente de atribuir notas, por favor, tente novamente mais tarde."
      );
    }
  },
  computed: {
    hasRequiredFieldsVoid() {
      if (this.criterias.length) {
        return this.criterias.some(field => !field.name || !field.grade);
      }
      return true;
    }
  },
  data() {
    return {
      criterias: [],
      isLoading: false,
      user: {}
    };
  },
  props: {
    sprintInfo: Object
  },
  methods: {
    isNumber(evt, value) {
      evt = evt ? evt : window.event;
      const charCode = evt.which ? evt.which : evt.keyCode;
      const myValue = value ? value + evt.key : evt.key;
      if (
        (charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          charCode !== 46) ||
        (Number(myValue) < 0 || Number(myValue) > 10)
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    async giveGrade() {
      const self = this;
      try {
        this.isLoading = true;
        const sprintGrade = this.criterias
          .reduce(
            (accumulator, criteria) =>
              Number(criteria.grade) * (Number(criteria.weight) / 100) +
              accumulator,
            0
          )
          .toString();
        if (Number(sprintGrade) > 10 || Number(sprintGrade) < 0)
          showError(
            self,
            "Nota inválida",
            "A nota deve ser de 0 à 10 para cada critério, por favor, preencha corretamente."
          );
        else {
          await setGroupGrade(
            this.criterias,
            this.user.groupId,
            this.sprintInfo,
            sprintGrade,
            this.user.email
          );
        }
        this.criterias.forEach(criteria => (criteria.grade = ""));
        setTimeout(() => (this.isLoading = false), 1000);
      } catch (err) {
        this.isLoading = false;
        showError(
          self,
          err,
          "Ocorreu um erro ao atribuir a nota, por favor, tente novamente mais tarde."
        );
      }
    }
  }
};
</script>

<style lang="scss">
.box-shadow-none {
  box-shadow: none;
}

.d-flex {
  display: flex;
}

.center {
  justify-content: center;
}

.w-80p {
  width: 60%;
}

.bg-color-transparent {
  background-color: transparent !important;
}

.bg-color-default {
  background-color: #fafafa !important;
}

.card-title {
  font-size: 1.5em !important;
}

.confirm-button {
  color: white !important;
}
</style>