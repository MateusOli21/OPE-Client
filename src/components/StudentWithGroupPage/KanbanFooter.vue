<template>
  <div class="k-footer">
    <ModalCreateNewCard
      v-if="stage === 'Backlog Global'"
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
    onchange: Function
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
