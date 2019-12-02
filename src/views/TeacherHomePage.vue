<template>
  <div>
    <MainMenu :tabSelected.sync="tabSelected" />
    <GroupTab v-if="this.tabSelected === 'Grupo'"/>
    <SprintTab v-if="this.tabSelected === 'Sprint'"/>
    <GradeTab v-if="this.tabSelected === 'Notas'"/>
  </div>
</template>

<script>
import MainMenu from '../components/MainMenu'
import GroupTab from '../components/TeacherPage/GroupTab'
import SprintTab from '../components/TeacherPage/SprintTab'
import GradeTab from '../components/TeacherPage/GradeTab'

export default {
  data() {
    return {
      tabSelected: "Grupo"
    }
  },
  components:{
    MainMenu,
    GroupTab,
    SprintTab,
    GradeTab
  }
}
</script>

<style scoped>

</style>
