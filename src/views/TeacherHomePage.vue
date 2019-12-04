<template>
  <div class="main">
    <MainMenu class="main-menu" :tabSelected.sync="tabSelected" />
    <GroupTab class="component" v-if="this.tabSelected === 'Grupo'" />
    <SprintTab class="component" v-if="this.tabSelected === 'Sprint'" />
    <GradeTab class="component" v-if="this.tabSelected === 'Notas'" />
  </div>
</template>

<script>
import MainMenu from "../components/MainMenu";
import GroupTab from "../components/TeacherPage/GroupTab";
import SprintTab from "../components/TeacherPage/SprintTab";
import GradeTab from "../components/TeacherPage/GradeTab";

export default {
  data() {
    return {
      tabSelected: "Grupo"
    };
  },
  components: {
    MainMenu,
    GroupTab,
    SprintTab,
    GradeTab
  }
};
</script>

<style scoped>
.main {
  position: relative;
  right: 67px !important;
}
.main-menu {
  position: relative;
  right: 67px !important;
}
.component {
  position: relative;
  left: 67px !important;
}
</style>
