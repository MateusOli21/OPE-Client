<template>
  <div>
    <div>
      <h2>{{ currentStage }}</h2>
    </div>
    <div class="select-sprint" v-if="currentStage === 'Backlog da Sprint'">
      <v-select
        :items="sprintNumberForSprintSelect"
        @change="changeSprintNumber"
        v-model="sprintDefault"
        :label="label"
      ></v-select>
      <span>Data de início: {{sprintStartDate}}</span>
      <span>Data final: {{sprintEndDate}}</span>
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
  h4 {
    font-weight: normal !important;
  }
}
</style>
