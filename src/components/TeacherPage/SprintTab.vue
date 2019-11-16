<template>
  <div>
    <div>
      <v-container v-if="!$store.getters.teacherSeeGroupDetails">
        <v-layout>
          <v-flex>
            <v-row justify="center">
              <v-card width="500px" max-height="550px" class="px-8 py-4">
                <v-card-title>Iniciar Sprints</v-card-title>
                <v-card-text>
                  <v-select :items="courses" label="Turmas" v-model="classSelected"></v-select>
                  <v-select :items="courses" label="Atividades Contínua" v-model="classSelected"></v-select>
                  <v-select :items="courses" label="Sprints" v-model="classSelected"></v-select>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    depressed
                    block
                    dark
                    color="indigo darken-1"
                    class="mt-2 mb-2"
                    @click="iniciarSprint"
                  >Iniciar Sprint</v-btn>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <SprintTab v-if="$store.getters.teacherSeeGroupDetails" />
  </div>
</template>

<script>
import SprintTab from "../StudentWithGroupPage/SprintTab";
import { getGoogleUserData } from "../../services/LocalForage";

export default {
  data() {
    return {
      user: {},
      courses: []
    };
  },
  async beforeCreate() {
    const user = await getGoogleUserData();
    this.user = JSON.parse(user);
  },
  components: {
    SprintTab
  },
  methods: {
    handleSelectActivities(activities, currentSprintNumber) {
      const activitiesToShow = [];
      let iterator = 0;
      for (const activity of activities) {
        if (activity.sprintNumber)
          this.sprintRunningObject[activity.sprintNumber] = true;
        if (
          activity.sprintNumber === currentSprintNumber ||
          activity.sprintNumber === null
        ) {
          const activityToPush = {
            text: activity.title,
            value: {
              id: activity.id,
              title: activity.title,
              courseId: activity.courseId,
              sprintNumber: activity.sprintNumber,
              iterator
            }
          };
          activitiesToShow.push(activityToPush);
        }
        iterator++;
      }
      return activitiesToShow;
    },
    async getCoursesOfGrouping(grouping) {
      this.currentGrouping = grouping;
      this.$swal.fire({
        title: "Agrupando",
        timer: 4000,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        }
      });
      const { data } = await getActivitiesByGrouping(grouping, this.user.email);
      this.courses = data;
    },
    setSprintInActivity(activity) {
      // activity possui title, id, courseId, sprintNumber, iterator
      this.activities.push(activity);
    },
    async startSprint(sprintNumber, pcsta) {
      const response = await this.$swal.fire({
        title: "Você tem certeza que deseja iniciar a sprint?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, eu tenho!",
        cancelButtonText: "Cancelar"
      });
      if (response.value) {
        try {
          this.$swal.fire({
            title: "Iniciando sprint...",
            timer: 2000,
            onBeforeOpen: () => {
              this.$swal.showLoading();
            }
          });
          const sprintInfo = {
            pcstaId: pcsta._id,
            activities: this.activities,
            sprintNumber,
            isFinished: false
          };
          const pcstaPayload = {
            _id: pcsta._id,
            title: pcsta.title,
            courseId: pcsta.courseId,
            grouping: this.currentGrouping
          };
          const sprintStarted = await startSprint(sprintInfo, pcstaPayload);
          if (sprintStarted.status === 201) {
            this.sprintRunningObject[sprintNumber] = true;
            // this.courses[courseIndex].activitiesToResponse[]
          }
        } catch (err) {
          const self = this;
          showError(
            self,
            err,
            `Não foi possível iniciar a sprint, por favor, tente novamente mais tarde.`
          );
        }
      }
    },
    async endSprint(pcstaId, sprintNumber) {
      const sprintInfo = await getSprintInfo(pcstaId);
      sprintInfo.isFinished = true;
      const endedSprint = await endSprint(sprintInfo);
      if (endedSprint.status === 200)
        this.sprintRunningObject[sprintNumber] = false;
      return;
    }
  }
};
</script>

<style scoped>
</style>
