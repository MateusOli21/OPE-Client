<template>
  <v-card class="mx-auto mt-5" max-width="100%">
    <v-card-text class="pb-0">
      <div class="card">
        <p class="display-1 text--primary mt-2">
          Sprint {{sprintNumber}}
          <small class="status-sprint">{{sprintRunningObject[sprintNumber]}}</small>
        </p>
        <v-select
          :items="handleSelectActivities(course.activitiesToResponse, sprintNumber)"
          :multiple="true"
          @change="setSprintInActivity"
          filled
          :value="activitiesObject[sprintNumber]"
          label="Atividades Contínuas"
          :disabled="sprintRunningObject[sprintNumber] === 'Finalizada'"
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
          :disabled="(sprintRunningObject[sprintNumber] === 'Finalizada') || (sprintRunningObject[sprintNumber] === 'Em execução')"
          @click="startSprint(sprintNumber, course.pcsta, courseIndex)"
        >Iniciar Sprint</v-btn>
      </div>
      <div>
        <v-btn
          depressed
          block
          color="red lighten-2"
          class="white--text"
          :disabled="sprintRunningObject[sprintNumber] === 'Finalizada'"
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
  async beforeMount() {
    const { data: sprintInfo } = await getSprintInfo(this.course.pcsta._id);
    const hasRunningObjectInLocalStorage = !!localStorage.getItem(
      "sprintRunningObject"
    );
    const copySprintRunningObject = hasRunningObjectInLocalStorage
      ? localStorage.getItem("sprintRunningObject")
      : this.sprintRunningObject;
    const formatRunningObject = hasRunningObjectInLocalStorage
      ? { ...JSON.parse(copySprintRunningObject) }
      : { ...this.sprintRunningObject };

    if (sprintInfo || sprintInfo.length) {
      const currentSprintInfo = sprintInfo.length
        ? sprintInfo.find(info => info.sprintNumber === this.sprintNumber)
        : sprintInfo;

      if (currentSprintInfo) {
        if (currentSprintInfo.sprintNumber === this.sprintNumber) {
          let value;
          if (
            !currentSprintInfo.isFinished &&
            currentSprintInfo.activities.length
          )
            value = "Em execução";
          if (currentSprintInfo.isFinished) value = "Finalizada";
          this.sprintRunningObject = {
            ...formatRunningObject,
            [this.sprintNumber]: value
          };
          localStorage.setItem(
            "sprintRunningObject",
            JSON.stringify(this.sprintRunningObject)
          );
        }
      } else {
        this.sprintRunningObject = {
          ...formatRunningObject,
          [this.sprintNumber]: "Não iniciada"
        };
        localStorage.setItem(
          "sprintRunningObject",
          JSON.stringify(this.sprintRunningObject)
        );
      }
    }
  },
  beforeDestroy() {
    localStorage.removeItem("sprintRunningObject");
  },
  data() {
    return {
      sprintRunningObject: localStorage.getItem("sprintRunningObject"),
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
            this.sprintRunningObject[sprintNumber] = "Em execução";
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
        console.log('activity.sprintNumber === currentSprintNumber:', activity)
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
      console.log('activitiesToShow:', activitiesToShow, 'restOfActivities:', restOfActivities, 'currentSprintNumber:', currentSprintNumber)
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
