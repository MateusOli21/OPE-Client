<template>
  <div>
    <div>
      <v-container>
        <v-row>
          <v-col md="12">
            <v-card>
              <v-card-title class="pt-10 ml-8 mr-10">
                Selecione um agrupamento
                <v-spacer></v-spacer>
                <div class="groupingsDropdown">
                  <v-select :items="groupings" label="Agrupamentos" @change="getCoursesOfGrouping"></v-select>
                </div>
              </v-card-title>
              <v-card-text>
                <ExpansionPanelGrouping
                  :courses="courses"
                  :currentGrouping="currentGrouping"
                  :sprintsInfoOfGrouping="sprintsInfoOfGrouping"
                  :updateComponent="updateComponent"
                  :key="key"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { getGoogleUserData } from "../../services/LocalForage";
import {
  getActivitiesByGrouping,
  verifyActvitiesByGrouping,
  createActivitiesByGrouping,
  getSprintInfo
} from "../../services/SprintApi";
import { showLoader, showWarning, showError } from "../../helpers/sweetAlert";
import ExpansionPanelGrouping from "./ExpansionPanelGrouping";

export default {
  data() {
    return {
      user: {},
      groupings: [
        { text: "Agrupamento 1", value: "groupOne" },
        { text: "Agrupamento 2", value: "groupTwo" },
        { text: "Agrupamento 3", value: "groupThree" }
      ],
      activities: [],
      courses: [],
      sprintsInfoOfGrouping: [],
      currentGrouping: "",
      key: 0
    };
  },
  async beforeCreate() {
    const user = await getGoogleUserData();
    this.user = JSON.parse(user);
  },
  components: {
    ExpansionPanelGrouping
  },
  methods: {
    async updateComponent() {
      await this.getCoursesOfGrouping(this.currentGrouping, true);
      this.key = ++this.key;
    },
    async getCoursesOfGrouping(grouping, isUpdate) {
      const self = this;
      try {
        if (!isUpdate) {
          this.currentGrouping = grouping;
          showLoader(self, "Verificando atividades contínuas");
          const {
            data: { needToCreate }
          } = await verifyActvitiesByGrouping(grouping, this.user.email);
          this.$swal.close();
          if (needToCreate) {
            showLoader(self, "Criando atividades contínuas");
            await createActivitiesByGrouping(grouping, this.user.email);
          }
          showLoader(self, "Carregando as turmas");
        } else {
          showLoader(self, "Atualizando a sprint");
        }
        let { data } = await getActivitiesByGrouping(grouping, this.user.email);
        if (!data.length)
          setTimeout(
            () =>
              showWarning(
                self,
                "No momento não existe nenhuma turma nesse agrupamento."
              ),
            1000
          );
        this.$swal.close();
        const sprintsInfoOfGrouping = await Promise.all(
          data.map(async course => {
            const { data } = await getSprintInfo(course.pcsta._id);
            return { pcstaId: course.pcsta._id, sprintInfos: data };
          })
        );
        this.courses = data;
        this.sprintsInfoOfGrouping = Object.values(sprintsInfoOfGrouping);
      } catch (err) {
        showError(self, err, "Algo deu errado, por favor, tente novamente.");
      }
    }
  }
};
</script>

<style lang="scss">
.groupingsDropdown {
  width: 55%;
}
</style>
