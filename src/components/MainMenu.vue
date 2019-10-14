<template>
  <div class="menu">
    <template>
      <v-container class="grey lighten-5" mt-5 mb-3>
        <v-row no-gutters align="center">
          <v-col v-for="(menu, index) in menuItem" :key="index" cols="12" sm="4">
            <v-btn @click="selectTab(menu.name)" block text large>{{ menu.name }}</v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-container>
      <div class="to-right">
        <ButtonBackToHome v-if="isGropDetais" />
      </div>
    </template>
  </div>
</template>

<script>
import ButtonBackToHome from "./TeacherPage/ ButtonBackToHome";

export default {
  data() {
    return {
      isGropDetais: !!localStorage.getItem("groupDetails"),
      menuItem: [{ name: "Grupo" }, { name: "Sprint" }, { name: "Notas" }]
    };
  },
  props: {
    tabSelected: String
  },
  methods: {
    selectTab(tab){
      this.$emit('update:tabSelected', tab)
    }
  },
  components: {
    ButtonBackToHome
  },
};
</script>

<style scoped>
.to-right {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}
</style>
