<template>
  <kanban-board :stages="stages" :blocks="blocks" @update-block="updateBlock">
    <KanbanHeader
      v-for="stage in stages"
      :slot="stage"
      :key="stage"
      :onchange="getCardsBySprint"
      :currentStage="stage"
      :sprintStartDate="sprintStartDate"
      :sprintEndDate="sprintEndDate"
      :sprintSelected.sync="sprintSelected"
      label="Sprint"
    />
    <!--
      <div :class="getPriorityColor(block.priority)"></div>
      <span v-text="block.statusCard"></span>
    -->
    <v-card v-for="block in blocks" :slot="block.id" :key="block.id" width="100%" height="100%">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="headline" v-text="block.title"></v-card-title>
        </div>

        <v-icon @click="deleteCard(block.id, sprintSelected)">mdi-delete</v-icon>

        <v-avatar class="ma-3" size="50" tile>
          <v-img style="border-radius: 100px;" :src="block.responsible.avatar"></v-img>
        </v-avatar>
      </div>
    </v-card>
    <KanbanFooter
      v-for="stage in stages"
      :key="stage"
      :slot="`footer-${stage}`"
      :stage="stage"
      :onchange="getCardsBySprint"
    />
  </kanban-board>
</template>

<script>
import { getGoogleUserData } from "../../services/LocalForage";
import {
  deleteCard,
  updateCard,
  getSprintInfo,
  getCards
} from "../../services/SprintApi";
import KanbanHeader from "./KanbanHeader";
import KanbanFooter from "./KanbanFooter"


export default {
  async beforeMount() {
    const user = await getGoogleUserData();
    this.user = JSON.parse(user);
    if (!this.user.isStudent)
      this.stages = ["Backlog Prometido", "Backlog da Sprint"];
    const { data } = await getCards(this.user.groupId, 1);
    data.forEach(card => {
      card.id = card._id;
      card.statusCard = card.status;
      card.status =
        card.sprintNumber === 0 ? "Backlog Global" : "Backlog da Sprint";
      card.responsibleAvatar = card.responsible.avatar;
    });
    this.blocks = data;
  },
  components: {
    KanbanHeader,
    KanbanFooter
  },
  data() {
    return {
      user: "",
      sprintSelected: 1,
      sprintStartDate: "10/10/2019",
      sprintEndDate: "26/10/2019",
      stages: ["Backlog Global", "Backlog da Sprint"],
      blocks: []
    };
  },
  methods: {
    async getCardsBySprint() {
      const { data } = await getCards(this.user.groupId, this.sprintSelected);
      data.forEach(card => {
        card.id = card._id;
        card.statusCard = card.status;
        card.status =
          card.sprintNumber === 0 ? "Backlog Global" : "Backlog da Sprint";
        card.responsibleAvatar = card.responsible.avatar;
      });
      this.blocks = data;
    },
    async updateBlock(cardId, newStage) {
      const card = this.blocks.find(card => card.id === cardId);
      const originalPosition = card.sprintNumber;
      const originalStatus = card.status;
      try {
        if (newStage === "Backlog Global") {
          card.sprintNumber = 0;
          card.status = "Backlog Global";
        }
        if (newStage === "Backlog da Sprint") {
          card.sprintNumber = this.sprintSelected;
          card.status = "Backlog da Sprint";
        }
        await updateCard(card);
      } catch (err) {
        card.sprintNumber = originalPosition;
        card.status = originalStatus;
      }
    },
    getPriorityColor(priority) {
      if (priority === "alta") return "k-red";
      if (priority === "media") return "k-yellow";
      if (priority === "baixa") return "k-green";
    },
    async deleteCard(cardId, sprintNumber) {
      const cardDeleted = await deleteCard(cardId);
      const { data } = await getCards(this.user.groupId, sprintNumber);
      const array = data.forEach(card => {
        card.id = card._id;
        card.statusCard = card.status;
        card.status =
          card.sprintNumber === 0 ? "Backlog Global" : "Backlog da Sprint";
        card.responsibleAvatar = card.responsible.avatar;
      });
      this.blocks = data;
    }
  }
};
</script>

<style lang="scss">
@import "node_modules/vue-kanban/src/assets/kanban.scss";

.drag-inner-list {
  height: 650px;
  overflow-y: scroll;
}

.drag-container {
  font-family: Roboto, sans-serif;
}

.drag-column-header h2 {
  font-size: 1em;
  padding: 10px 0 0 10px;
}

.drag-column {
  border-radius: 5px;
  border: 1px solid #a5a4a4;
  background-color: #ebecf0;
}

.drag-item {
  border-radius: 5px;
  background-color: #ebecf0;
  color: black;
  height: 130px;

  div {
    width: 100%;
    display: flex;

    .k-red {
      background-color: red;
      width: 20px;
      height: 20px;
      border-radius: 35px;
      border: 1px solid #a5a4a4;
    }

    .k-yellow {
      background-color: yellow;
      width: 20px;
      height: 20px;
      border-radius: 35px;
      border: 1px solid #a5a4a4;
    }

    .k-green {
      background-color: green;
      width: 20px;
      height: 20px;
      border-radius: 35px;
      border: 1px solid #a5a4a4;
    }
  }

  h4 {
    font-weight: normal;
    color: #414141;
  }

  img {
    border-radius: 35px;
    width: 40px;
  }

  &.is-moving {
    transform: none;
    background-color: #ebecf0;
  }
}
</style>
