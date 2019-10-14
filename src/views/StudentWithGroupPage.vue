<template>
  <div>
    <MainMenu :tabSelected.sync="tabSelected" />
    <GroupTab v-if="this.tabSelected === 'Grupo'" />
  </div>
</template>

<script>
import MainMenu from "../components/MainMenu";
import GroupTab from "../components/StudentWithGroupPage/GroupTab";

export default {
  name: "StudentWithGroup",
    data() {
    return {
      tabSelected: "Grupo"
    }
  },
  components: {
    MainMenu,
    GroupTab
  }
};
</script>


<style scoped>
</style>
