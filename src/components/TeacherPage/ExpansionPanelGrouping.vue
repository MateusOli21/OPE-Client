<template>
  <v-expansion-panels :popout="true" :focusable="true" float="left">
    <v-expansion-panel v-for="(course, courseIndex) in courses.courses" :key="course.pcsta._id">
      <v-expansion-panel-header @click="update">{{course.pcsta.title}}</v-expansion-panel-header>
      <v-expansion-panel-content v-for="sprintNumber in sprints" :key="sprintNumber">
        <SprintCard
          :sprintNumber="sprintNumber"
          :grouping="courses.grouping"
          :course="course"
          :courseIndex="courseIndex"
          :reload="reload"
          :key="reload"
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
      sprints: [1, 2, 3, 4, 5, 6, 7, 8],
      reload: false
    };
  },
  components: {
    SprintCard
  },
  props: {
    courses: Object
  },
  methods: {
    update() {
      this.reload = !this.reload;
      setTimeout(() => {
        this.reload = !this.reload;
        this.reload = !this.reload;
      }, 1500);
    }
  }
};
</script>

<style lang="scss">
</style>
