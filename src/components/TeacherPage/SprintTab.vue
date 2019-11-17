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
                <ExpansionPanelGrouping :courses="courses" />
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
import { getActivitiesByGrouping } from "../../services/SprintApi";
import { showLoader, showWarning } from "../../helpers/sweetAlert";
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
      currentGrouping: ""
    };
  },
  async beforeCreate() {
    const user = await getGoogleUserData();
    this.user = JSON.parse(user);

    // if (currentSprintNumber === 1) {
    //   const sprintsInfo = await getSprintInfo(pcstaId)
    //   if (sprintsInfo.status === 200) {
    //     if (typeof sprintsInfo.data === 'array' && Object.keys(sprintsInfo.data).length) {
    //       sprintsInfo.data.forEach(sprintInfo => {
    //         this.sprintRunningObject[sprintInfo.sprintNumber] = true
    //       })
    //     } else if (typeof sprintsInfo.data !== 'array' && Object.keys(sprintsInfo.data).length) {
    //       this.sprintRunningObject[sprintsInfo.data.sprintNumber] = true
    //     }
    //   }
    // }
  },
  components: {
    ExpansionPanelGrouping
  },
  methods: {
    async getCoursesOfGrouping(grouping) {
      try {
        this.currentGrouping = grouping;
        const self = this;
        showLoader(self, "Carregando", 4000);
        const { data } = await getActivitiesByGrouping(
          grouping,
          this.user.email
        );
        if (!data.length)
          setTimeout(
            () =>
              showWarning(
                self,
                "No momento não existe nenhuma turma nesse agrupamento."
              ),
            1000
          );
        this.courses = data;
      } catch (err) {
        return;
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
