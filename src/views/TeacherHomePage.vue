<template>
  <div>
    <MainMenu :tabSelected.sync="tabSelected" />
    <GroupTab v-if="this.tabSelected === 'Grupo'"/>
    <SprintTab v-if="this.tabSelected === 'Sprint'"/>
  </div>
</template>

<script>
import MainMenu from '../components/MainMenu'
import GroupTab from '../components/TeacherPage/GroupTab'
import SprintTab from '../components/TeacherPage/SprintTab'

export default {
  data() {
    return {
      tabSelected: "Grupo"
    }
  },
  components:{
    MainMenu,
    GroupTab,
    SprintTab
  }
}
</script>

<style scoped>

</style>
