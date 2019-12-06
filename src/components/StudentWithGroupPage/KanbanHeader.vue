<template>
  <v-container>
    <v-row>
      <v-col md="12">
        <div class="d-flex space-between">
          <h2>{{ currentStage }}</h2>
          <GiveGrade :sprintInfo="sprintInfo" v-if="currentStage === 'Backlog da Sprint' && blockedBoard && !isStudent" />
        </div>
        <div v-if="currentStage === 'Backlog da Sprint' && blockedBoard" class="text-right">
          <small class="red--text">Sprint finalizada</small>
        </div>
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
    <div
      class="blockBoard"
      v-if="(currentStage === 'Backlog da Sprint' && blockedBoard) || !isStudent"
    ></div>
  </v-container>
</template>

<script>
import GiveGrade from '../TeacherPage/GiveGrade';

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
    onchange: Function,
    blockedBoard: Boolean,
    isStudent: Boolean,
    sprintInfo: Object
  },
  components: {
    GiveGrade
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
  z-index: 99;
  width: 100%;
  margin-top: 29px;
  h4 {
    font-weight: normal !important;
  }
}

.d-flex {
  display: flex;
}

.space-between {
  justify-content: space-between;
}

.bottom-5 {
  bottom: 5px;
}

.blockBoard {
  width: 100%;
  height: 1000px;
  position: absolute;
  right: 0;
  z-index: 2;
}
</style>
