<template>
  <div>
    <div>
      <h2>{{ currentStage }}</h2>
    </div>
    <div v-if="currentStage === 'Backlog da Sprint'">
      <div class="select-sprint">
        <v-select
          :items="sprintNumberForSprintSelect"
          @change="changeSprintNumber"
          v-model="sprintDefault"
          :label="label"
        ></v-select>
      </div>
      <div class="dates-of-sprint">
        <span>Data de início: {{sprintStartDate ? sprintStartDate : '__/__/__'}}</span>
        <span>Data final: {{sprintEndDate ? sprintEndDate : '__/__/__'}}</span>
      </div>
    </div>
  </div>
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
  width: 15%;
  margin-top: 29px;
  h4 {
    font-weight: normal !important;
  }
}
.dates-of-sprint {
  display: flex;
  width: 440px;
  justify-content: space-between;
}
</style>
