<template>
  <div>
    <template>
      <v-container class="grey lighten-5 menu" mt-5 mb-3>
        <v-row no-gutters align="center">
          <v-col v-for="(menu, index) in menuItem" :key="index" cols="12" sm="4">
            <v-btn @click="selectTab(menu.name)" :class="{'selectTab': menu.name === actualTab}" block text large>{{ menu.name }}</v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-container>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actualTab: "Grupo",
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
  }
};
</script>

<style scoped>
.selectTab {
  background-color: #e4e5e6;
}
.menu {
  padding-top: 0 !important;
  margin-top: 0 !important;
}
</style>
