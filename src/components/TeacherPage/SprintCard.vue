<template>
  <v-card class="mx-auto mt-5" max-width="100%">
    <v-card-text>
      <div class="card">
        <p class="display-1 text--primary mt-2">
          Sprint {{sprintNumber}}
          <small v-if="sprintRunningObject[sprintNumber]">Em andamento</small>
        </p>
        <v-select
          :items="handleSelectActivities(course.activitiesToResponse, sprintNumber)"
          :multiple="true"
          @change="setSprintInActivity"
          filled
          :value="activitiesObject[sprintNumber]"
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
</template>

<script>
import {
  startSprint,
  endSprint,
  getSprintInfo
} from "../../services/SprintApi";
import { showError, showLoader } from "../../helpers/sweetAlert";

export default {
  data() {
    return {
      sprintRunningObject: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false
      },
      activitiesObject: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: []
      },
      activities: []
    };
  },
  props: {
    sprintNumber: Number,
    courseIndex: Number,
    course: Object
  },
  methods: {
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
          const self = this;
          showLoader(self, "Iniciando sprint...", 2000);
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
      const { data } = await getSprintInfo(pcstaId);
      data.isFinished = true;
      const endedSprint = await endSprint(data);
      if (endedSprint.status === 200)
        this.sprintRunningObject[sprintNumber] = false;
      return;
    },
    handleSelectActivities(activities, currentSprintNumber) {
      const activitiesToShow = [];
      const restOfActivities = [];
      let iterator = 0;
      for (const activity of activities) {
        if (activity.sprintNumber)
          this.sprintRunningObject[activity.sprintNumber] = true;
        if (activity.sprintNumber === currentSprintNumber) {
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
        } else if (activity.sprintNumber === null) {
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
          restOfActivities.push(activityToPush);
        }
        iterator++;
      }
      if (activitiesToShow.length) {
        this.activitiesObject[currentSprintNumber] = activitiesToShow;
        return activitiesToShow;
      } else {
        this.activitiesObject[currentSprintNumber] = restOfActivities;
        return restOfActivities;
      }
    },
    setSprintInActivity(activities) {
      const selectedActivities = activities.map(activity => activity);
      this.activities = selectedActivities;
    }
  }
};
</script>

<style lang="scss">
</style>
