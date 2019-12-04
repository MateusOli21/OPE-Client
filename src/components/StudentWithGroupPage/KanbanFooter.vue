<template>
  <div class="k-footer">
    <ModalCreateNewCard
      v-if="stage === 'Backlog Global' && isStudent"
      :oncreate="oncreate"
    />
  </div>
</template>

<script>
import ModalCreateNewCard from "./ModalCreateNewCard"

export default {
  components: {
    ModalCreateNewCard
  },
  props: {
    stage: String,
    onchange: Function,
    isStudent: Boolean
  },
  methods: {
    oncreate() {
      this.onchange()
    }
  }
};
</script>

<style lang="scss">
.k-footer {
  margin: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
