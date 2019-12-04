<template>
  <div class="main">
    <MainMenu class="main-menu" :tabSelected.sync="tabSelected" />
    <GroupTab class="component" v-if="this.tabSelected === 'Grupo'" />
    <SprintTab class="component" v-if="this.tabSelected === 'Sprint'" />
  </div>
</template>

<script>
import MainMenu from "../components/MainMenu";
import GroupTab from "../components/StudentWithGroupPage/GroupTab";
import SprintTab from "../components/StudentWithGroupPage/SprintTab";

export default {
  name: "StudentWithGroup",
  data() {
    return {
      tabSelected: "Grupo"
    };
  },
  components: {
    MainMenu,
    GroupTab,
    SprintTab
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
