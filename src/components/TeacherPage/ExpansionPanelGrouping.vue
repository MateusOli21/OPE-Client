<template>
  <v-expansion-panels :popout="true" :focusable="true" float="left">
    <v-expansion-panel v-for="(course, courseIndex) in courses" :key="course.pcsta._id">
      <v-expansion-panel-header>{{course.pcsta.title}}</v-expansion-panel-header>
      <v-expansion-panel-content v-for="sprintNumber in sprints" :key="sprintNumber">
        <SprintCard :sprintNumber="sprintNumber" :course="course" :courseIndex="courseIndex" />
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
    courses: Array
  }
};
</script>

<style lang="scss">
</style>
