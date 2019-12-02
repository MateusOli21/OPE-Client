<template>
  <div>
    <template>
      <v-container class="menu">
        <v-row no-gutters align="center">
          <v-col v-for="(menu, index) in menuItem" :key="index" cols="12" sm="4">
            <v-btn
              @click="selectTab(menu.name)"
              :class="{'selectTab': menu.name === actualTab}"
              block
              text
              large
            >{{ menu.name }}</v-btn>
          </v-col>
        </v-row>
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
      this.actualTab = tab;
    }
  }
};
</script>

<style scoped>
.selectTab {
  background-color: #5561ad;
}
.menu {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-top: -58px !important;
  width: 63% !important;
  background-color: #3949ab !important;
}
button.v-btn.v-btn--block.v-btn--flat.v-btn--text.theme--light.v-size--large {
  color: white;
  box-shadow: none !important;
  height: 58px;
}
</style>
