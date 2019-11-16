<template>
  <v-container>
    <v-row>
      <v-col md="12">
        <h2>{{ currentStage }}</h2>
        <div v-if="currentStage === 'Backlog da Sprint'" class="d-flex justify-end">
          <div class="select-sprint">
            <v-select
              :items="sprintNumberForSprintSelect"
              @change="changeSprintNumber"
              v-model="sprintDefault"
              :label="label"
            ></v-select>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      sprintDefault: 1,
      sprintNumberForSprintSelect: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  props: {
    model: Number,
    currentStage: String,
    label: String,
    sprintStartDate: String,
    sprintEndDate: String,
    onchange: Function
  },
  methods: {
    async changeSprintNumber(sprintNumber) {
      this.sprintSelected = sprintNumber;
      this.$emit("update:sprintSelected", sprintNumber);
      this.onchange();
    }
  }
};
</script>

<style lang="scss">
.select-sprint {
  z-index: 99999;
  width: 100%;
  margin-top: 29px;
  h4 {
    font-weight: normal !important;
  }
}
</style>
