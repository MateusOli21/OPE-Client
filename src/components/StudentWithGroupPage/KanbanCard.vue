<template>
  <v-card :slot="block.id" width="100%" height="100%">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline" v-text="block.title"></v-card-title>
      </div>

      <v-icon @click="deleteCard(block.id)">mdi-delete</v-icon>

      <v-avatar class="ma-3" size="50" tile>
        <v-img style="border-radius: 100px;" :src="block.responsible.avatar"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
import { deleteCard } from "../../services/SprintApi";

export default {
  props: {
    block: Object,
    onchange: Function
  },
  methods: {
    async deleteCard(cardId) {
      await deleteCard(cardId);
      this.onchange()
    }
  }
};
</script>

<style lang="scss">
</style>
