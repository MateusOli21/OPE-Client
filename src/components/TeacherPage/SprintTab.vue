<template>
  <div>
    <div>
      <v-container v-if="!$store.getters.teacherSeeGroupDetails">
        <v-layout>
          <v-flex>
            <v-row justify="center">
              <div class="groupingsDropdown">
                <v-select :items="groupings" label="Agrupamentos" @change="getCoursesOfGrouping"></v-select>
              </div>
              <v-expansion-panels :popout="true" :focusable="true" float="left">
                <v-expansion-panel v-for="(course, courseIndex) in courses" :key="course.pcsta._id">
                  <v-expansion-panel-header>{{course.pcsta.title}}</v-expansion-panel-header>
                  <v-expansion-panel-content v-for="sprintNumber in sprints" :key="sprintNumber">
                    <v-card class="mx-auto mt-5" max-width="100%">
                      <v-card-text>
                        <div class="card">
                          <p class="display-1 text--primary mt-2">
                            Sprint {{sprintNumber}}
                            <small
                              v-if="sprintRunningObject[sprintNumber]"
                              class="isRunning"
                            >Em andamento</small>
                          </p>
                          <v-select
                            :items="handleSelectActivities(course.activitiesToResponse, sprintNumber)"
                            :multiple="true"
                            @change="setSprintInActivity"
                            filled
                            label="Atividades Contínuas"
                          ></v-select>
                          <div v-for="ac in course.acs" :key="ac">{{ac}}</div>
                        </div>
                      </v-card-text>
                      <v-card-actions class="actionButtons">
                        <div>
                          <v-btn
                            block
                            color="teal lighten-1"
                            class="mt-2 mb-2"
                            :disabled="sprintRunningObject[sprintNumber]"
                            @click="startSprint(sprintNumber, course.pcsta, courseIndex)"
                          >Iniciar Sprint</v-btn>
                        </div>
                        <div>
                          <v-btn
                            depressed
                            block
                            color="red lighten-2"
                            class="white--text"
                            @click="endSprint(course.pcsta._id, sprintNumber)"
                          >Finalizar Sprint</v-btn>
                        </div>
                      </v-card-actions>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
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
import {
  getActivitiesByGrouping,
  startSprint,
  endSprint,
  getSprintInfo
} from "../../services/SprintApi";
import { showError } from "../../errors/sweetAlertError";

export default {
  data() {
    return {
      user: {},
      groupings: [
        { text: "Agrupamento 1", value: "groupOne" },
        { text: "Agrupamento 2", value: "groupTwo" },
        { text: "Agrupamento 3", value: "groupThree" }
      ],
      sprints: [1, 2, 3, 4, 5, 6, 7, 8],
      activities: [],
      courses: [],
      currentGrouping: "",
      sprintRunningObject: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false
      }
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
    async startSprint(sprintNumber, pcsta, courseIndex) {
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
          console.log("err:", err);
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
      const sprintInfo = await getSprintInfo(pcstaId)
      sprintInfo.isFinished = true
      const endedSprint = await endSprint(sprintInfo)
      if (endedSprint.status === 200) this.sprintRunningObject[sprintNumber] = false
      return;
    }
  }
};
</script>

<style lang="scss">
.groupingsDropdown {
  width: 30%;
}

.ACs {
  margin: 0;
  list-style: none;
  float: left;
  padding-left: 10px;

  div {
    float: left;
  }
}

.actionButtons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 15px;

  div {
    width: 48%;

    button {
      height: 40px !important;
    }
  }
}

.isRunning {
  font-size: 1rem;
  float: right;
}

.card {
  width: 100%;
}
</style>
