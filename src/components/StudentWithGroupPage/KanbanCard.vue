<template>
  <v-card class="mx-auto kanban-card" outlined>
    <v-list-item>
      <v-list-item-content>
        <div class="overline mb-2">{{block.statusCard}}</div>
        <v-list-item-title class="headline mb-1" v-text="block.title"></v-list-item-title>
        <v-list-item-subtitle>{{block.responsible.name}}</v-list-item-subtitle>
      </v-list-item-content>
      <span :class="getPriorityColor(block.priority)"></span>
    </v-list-item>

    <v-avatar class="ma-3 k-img" size="50" tile>
      <v-img :src="block.responsible.avatar"></v-img>
    </v-avatar>

    <v-card-actions>
      <v-btn icon>
        <v-icon @click="deleteCard(block.id)">mdi-delete</v-icon>
      </v-btn>
      <ModalEditCard :onedit="onEditChange" :receivedCard="block" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { deleteCard } from "../../services/SprintApi";
import ModalEditCard from "./ModalEditCard";

export default {
  props: {
    block: Object,
    onchange: Function
  },
  components: {
    ModalEditCard
  },
  methods: {
    async deleteCard(cardId) {
      await deleteCard(cardId);
      this.onchange();
    },
    onEditChange() {
      this.onchange();
    },
    getPriorityColor(priority) {
      if (priority === "alta") return "k-red";
      if (priority === "media") return "k-yellow";
      if (priority === "baixa") return "k-green";
    }
  }
};
</script>

<style lang="scss">
$border: 1px solid rgba(0, 0, 0, 0.13);

.kanban-card {
  width: 100%;
  height: 110px;
  display: flex;

  div.v-list-item__title.headline.mb-1 {
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.1em !important;
    width: 310px;
    display: block;
    overflow: hidden;
  }

  .k-img {
    border-radius: 60px;
    position: relative;
    right: 3px;
    top: 5px;
    border: $border;
  }

  div.v-card__actions {
    position: relative;
    top: 35px;
    right: 85px;
  }

  .k-red {
    background-color: red;
    width: 10px;
    height: 10px;
    border-radius: 35px;
    margin-bottom: 50px;
    position: relative;
    bottom: 20px;
    left: 80px;
    z-index: 10;
    border: $border;
  }

  .k-yellow {
    background-color: yellow;
    width: 10px;
    height: 10px;
    border-radius: 35px;
    margin-bottom: 50px;
    position: relative;
    bottom: 20px;
    left: 80px;
    z-index: 10;
    border: $border;
  }

  .k-green {
    background-color: green;
    width: 10px;
    height: 10px;
    border-radius: 35px;
    margin-bottom: 50px;
    position: relative;
    bottom: 20px;
    left: 80px;
    z-index: 10;
    border: $border;
  }
}
</style>
