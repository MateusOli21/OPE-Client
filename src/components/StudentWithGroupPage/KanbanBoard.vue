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
    <KanbanCard
      v-for="block in blocks"
      :key="block.id"
      :block="block"
      :onchange="getCardsBySprint"
      :slot="block.id"
    />
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
import {
  updateCard,
  // getSprintInfo,
  getCards
} from "../../services/SprintApi";
// import { getAllPcsta } from "../../services/GroupApi";
import KanbanHeader from "./KanbanHeader";
import KanbanFooter from "./KanbanFooter";
import KanbanCard from "./KanbanCard";

export default {
  watch: {
    async user() {
      /* const {
       data: { pcstas }
     } = await getAllPcsta();
     const pcsta = pcstas.find(pcsta => pcsta.courseId === this.user.courseId);
     const { data: sprintInfo } = await getSprintInfo(pcsta._id);
     console.log("sprintInfo:", sprintInfo); */
      if (!this.user.isStudent)
        this.stages = ["Backlog Prometido", "Backlog da Sprint"];
      this.getCardsBySprint();
    }
  },
  components: {
    KanbanHeader,
    KanbanFooter,
    KanbanCard
  },
  props: {
    user: Object
  },
  data() {
    return {
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
      try {
        const card = this.blocks.find(card => card.id === cardId);
        const copyOfCard = { ...card };
        const originalPosition = copyOfCard.sprintNumber;
        const originalStatus = copyOfCard.status;
        if (newStage === "Backlog Global") {
          card.sprintNumber = 0;
          card.status = "Backlog Global";
        }
        if (newStage === "Backlog da Sprint") {
          card.sprintNumber = this.sprintSelected;
          card.status = "Backlog da Sprint";
        }
        copyOfCard.sprintNumber =
          newStage === "Backlog Global"
            ? 0
            : newStage === "Backlog da Sprint"
            ? this.sprintSelected
            : originalPosition;
        copyOfCard.status = copyOfCard.statusCard;
        const { data } = await updateCard(card);
      } catch (err) {
        card.status = originalStatus;
        card.sprintNumber = originalPosition;
      }
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
@import "node_modules/vue-kanban/src/assets/kanban.scss";

li.drag-column.drag-column-Backlog.Global {
  .drag-inner-list {
    overflow-y: scroll;
    height: 100%;
    max-height: 700px;
  }
}

li.drag-column.drag-column-Backlog.da.Sprint {
  .drag-inner-list {
    overflow-y: scroll;
    height: 100%;
    max-height: 642px;
  }
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
    div.v-avatar.ma-3.k-img.v-avatar--tile {
      margin-top: 13px;
      margin-left: 13px;
    }

    div.v-card__actions {
      margin-left: 10px;
    }

    div.overline.mb-2 {
      margin-bottom: 8px !important;
      font-size: 0.625rem !important;
      font-weight: 400;
      letter-spacing: 0.1666666667em !important;
      line-height: 1rem;
      text-transform: uppercase;
    }

    div.v-list-item__title.headline.mb-1 {
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 1.1em !important;
      width: 310px;
      display: block;
      overflow: hidden;
    }
  }
}
</style>
