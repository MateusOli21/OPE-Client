<template>
  <div class="menu">
    <template>
      <v-container class="grey lighten-5" mt-5 mb-3>
        <!-- TODO; FAZER COM QUE O PROFESSOR VISUALIZE O COMPONENTE GROUPTAB COM OS DADOS DO GRUPO, AO INVÉS DE SER REDIRECIONADO A UMA OUTRA ROTA -->
        <v-row no-gutters align="center">
          <v-col v-for="(menu, index) in menuItem" :key="index" cols="12" sm="4">
            <v-btn @click="selectTab(menu.name)" :class="{'selectTab': menu.name === actualTab}" block text large>{{ menu.name }}</v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <div class="to-right">
          <ButtonBackToHome v-if="isGropDetails" />
        </div>
      </v-container>
    </template>
  </div>
</template>

<script>
import ButtonBackToHome from "./TeacherPage/ButtonBackToHome";

export default {
  data() {
    return {
      actualTab: "Grupo",
      isGropDetails: !!localStorage.getItem("groupDetails"),
      menuItem: [{ name: "Grupo" }, { name: "Sprint" }, { name: "Notas" }]
    };
  },
  props: {
    tabSelected: String
  },
  methods: {
    selectTab(tab) {
      this.$emit("update:tabSelected", tab);
      this.actualTab = tab
    }
  },
  components: {
    ButtonBackToHome
  }
};
</script>

<style scoped>
.to-right {
  display: flex;
  justify-content: flex-start;
  padding: 20PX 20px 0 0;
}
.selectTab {
  background-color: #e4e5e6;
}
</style>
