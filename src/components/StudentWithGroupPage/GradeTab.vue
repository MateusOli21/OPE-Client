<template>
  <v-container class="grey lighten-5 grade">
    <v-row no-gutters>
      <v-col sm="12">
        <v-card class="card">
          <v-card-title class="title">Minhas notas</v-card-title>
          <v-container class="lighten-5">
            <v-row style="width: 100%;" no-gutters>
              <v-col sm="12">
                <v-data-table
                  :headers="headers"
                  :items="grades"
                  :items-per-page="10"
                  class="elevation-1"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getGoogleUserData } from "../../services/LocalForage";
import { getGradesByStudentEmail, getCriterias } from "../../services/GradeApi";
import { getSprintInfoById } from "../../services/SprintApi";
import { showError } from "../../helpers/sweetAlert";

export default {
  async beforeMount() {
    const self = this;
    try {
      const user = await getGoogleUserData();
      this.user = JSON.parse(user);
      const { data: grades } = await getGradesByStudentEmail(this.user.email);
      const { data: criterias } = await getCriterias();
      const appendHeader =
        criterias && criterias.length
          ? criterias.map(criteria => {
              return { text: criteria.name, value: criteria.name };
            })
          : [];
      this.headers.push(...appendHeader);
      this.headers.push({ text: "Nota Final", value: "sprintGrade" });
      if (grades && grades.length) {
        const formatedGrades = await Promise.all(
          grades.map(async grade => {
            const {
              data: { sprintNumber }
            } = await getSprintInfoById(grade.sprintInfoId);
            const criterias = grade.criterias.reduce(
              (accumulator, criteria) => {
                return { ...accumulator, [criteria.name]: criteria.grade };
              },
              {}
            );

            return {
              sprintNumber,
              sprintGrade: grade.sprintGrade,
              ...criterias
            };
          })
        );
        this.grades = [...formatedGrades];
      }
    } catch (err) {
      showError(self, err, "Ocorreu um erro ao carregar as notas, por favor, tente novamente mais tarde.")
    }
  },
  data() {
    return {
      user: {},
      grades: [],
      headers: [{ text: "Número da sprint", value: "sprintNumber" }]
    };
  }
};
</script>

<style lang="scss">
.grade {
  font-family: Roboto, sans-serif !important;
  font-weight: 400 !important;
}
.card {
  position: relative;
  bottom: 25px;
}
</style>
