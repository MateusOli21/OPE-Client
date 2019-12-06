<template>
  <div class="text-right">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="indigo darken-1" x-small dark v-on="on">Visualizar cartões</v-btn>
      </template>

      <div v-for="card in cards" :key="card.key">
        <v-card class="mx-auto kanban-card-board-blocked" outlined>
          <v-list-item>
            <v-list-item-content>
              <div class="overline mb-2">{{card.statusCard}}</div>
              <v-list-item-title class="headline mb-1" v-text="card.title"></v-list-item-title>
              <v-list-item-subtitle>{{card.responsible.name}}</v-list-item-subtitle>
            </v-list-item-content>
            <span :class="getPriorityColor(card.priority)"></span>
          </v-list-item>

          <v-avatar class="ma-3 k-img" size="50" tile>
            <v-img :src="card.responsible.avatar"></v-img>
          </v-avatar>

          <v-card-actions>
            <ModalCardView :card="card" />
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import ModalCardView from "./ModalCardView";

export default {
  data() {
    return {
      dialog: false
    };
  },
  props: {
    cards: Array
  },
  components: {
    ModalCardView
  },
  methods: {
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

.kanban-card-board-blocked {
  width: 100%;
  height: 110px;
  display: flex;

  div.v-list-item__title.headline.mb-1 {
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.1em !important;
    width: 370px;
    display: card;
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
    right: 40px;
    margin-top: 70px;
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