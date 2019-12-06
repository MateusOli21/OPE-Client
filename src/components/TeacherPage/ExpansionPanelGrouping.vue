<template>
  <v-expansion-panels :popout="true" :focusable="true" float="left">
    <v-expansion-panel v-for="course in courses" :key="course.pcsta._id">
      <v-expansion-panel-header>{{course.pcsta.title}}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <SprintCard
          v-for="sprintNumber in sprints"
          :key="sprintNumber.key"
          :sprint="handleSprint(sprintNumber, course.pcsta._id)"
          :grouping="currentGrouping"
          :update="update"
          :course="course"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import SprintCard from "./SprintCard";

export default {
  data() {
    return {
      sprints: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  components: {
    SprintCard
  },
  props: {
    courses: Array,
    sprintsInfoOfGrouping: Array,
    updateComponent: Function,
    currentGrouping: String
  },
  methods: {
    handleSprint(sprintNumber, pcstaId) {
      const sprintInfoOfPcsta = Object.values(this.sprintsInfoOfGrouping)
        ? Object.values(this.sprintsInfoOfGrouping).find(
            sprintInfoOfGrouping => sprintInfoOfGrouping.pcstaId === pcstaId
          )
        : {};

      if (Object.keys(sprintInfoOfPcsta).length) {
        const currentSprintInfo = sprintInfoOfPcsta.sprintInfos.length
          ? sprintInfoOfPcsta.sprintInfos.find(
              info => info.sprintNumber === sprintNumber
            )
          : sprintInfoOfPcsta.sprintInfos;

        if (currentSprintInfo) {
          if (currentSprintInfo.sprintNumber === sprintNumber) {
            const sprint = {
              status: "Não iniciada",
              number: sprintNumber
            };
            if (!currentSprintInfo.isFinished) sprint.status = "Em execução";
            if (currentSprintInfo.isFinished) sprint.status = "Finalizada";
            return sprint;
          }
        } else {
          const sprint = { status: "Não iniciada", number: sprintNumber };
          return sprint;
        }
      } else {
        const sprint = { status: "Não iniciada", number: sprintNumber };
        return sprint;
      }
    },
    update() {
      this.updateComponent()
    }
  }
};
</script>

<style lang="scss">
</style>
