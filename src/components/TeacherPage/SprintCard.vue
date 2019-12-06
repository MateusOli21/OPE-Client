<template>
  <v-card class="mx-auto mt-5" max-width="100%" v-if="sprint">
    <v-card-text class="pb-0">
      <div class="card">
        <p class="display-1 text--primary mt-2">
          Sprint {{sprint.number}}
          <small class="status-sprint">{{sprint.status}}</small>
        </p>
        <v-select
          :items="handleSelectActivities(course.activitiesToResponse, sprint.number)"
          :multiple="true"
          @change="setSprintInActivity"
          filled
          :value="activitiesObject[sprint.number]"
          label="Atividades Contínuas"
          :disabled="sprint.status === 'Finalizada' || sprint.status === 'Em execução'"
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
          :disabled="sprint.status === 'Finalizada' || sprint.status === 'Em execução'"
          @click="startSprint(sprint.number, course.pcsta)"
        >Iniciar Sprint</v-btn>
      </div>
      <div>
        <v-btn
          depressed
          block
          color="red lighten-2"
          class="white--text"
          :disabled="sprint.status === 'Finalizada' || sprint.status === 'Não iniciada'"
          @click="endSprint(course.pcsta._id, sprint.number)"
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
    sprint: Object,
    course: Object,
    grouping: String,
    status: String,
    update: Function
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
            grouping: this.grouping
          };
          await startSprint(sprintInfo, pcstaPayload);
          this.update();
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
      const { data: sprintInfo } = await getSprintInfo(pcstaId);
      if (sprintInfo && sprintInfo.length) {
        const currentSprintInfo =
          sprintInfo.length > 1
            ? sprintInfo.find(info => info.sprintNumber === sprintNumber)
            : sprintInfo[0];

        if (
          currentSprintInfo &&
          currentSprintInfo.sprintNumber === sprintNumber
        ) {
          currentSprintInfo.isFinished = true;
          await endSprint(currentSprintInfo);
          this.update();
        }
      }
    },
    handleSelectActivities(activities, currentSprintNumber) {
      const activitiesToShow = [];
      const restOfActivities = [];
      let iterator = 0;

      for (const activity of activities) {
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
.actionButtons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  div {
    width: 48%;
    button {
      span {
        color: white;
      }
      height: 40px !important;
    }
  }
}

.pb-0 {
  padding-bottom: 0;
}

.status-sprint {
  font-weight: 200;
  font-size: 0.475em;
}
</style>
