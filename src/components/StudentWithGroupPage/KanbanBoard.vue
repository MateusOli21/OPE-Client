<template>
  <kanban-board :stages="stages" :blocks="blocks" @update-block="updateBlock">
    <KanbanHeader
      v-for="stage in stages"
      :slot="stage"
      :key="stage"
      :onchange="getCardsBySprint"
      :currentStage="stage"
      :sprintSelected.sync="sprintSelected"
      :blockedBoard="isFinished"
      :isStudent="user.isStudent"
      :sprintInfo="currentSprintInfo"
      :cards="blocks"
      label="Sprint"
    />
    <KanbanCards
      v-for="block in blocks"
      :key="block.id"
      :block="block"
      :onchange="getCardsBySprint"
      :slot="block.id"
      :blockedBoard="isFinished"
      :isStudent="user.isStudent"
    />
    <KanbanFooter
      v-for="stage in stages"
      :key="stage"
      :slot="`footer-${stage}`"
      :stage="stage"
      :onchange="getCardsBySprint"
      :isStudent="user.isStudent"
    />
  </kanban-board>
</template>

<script>
import {
  updateCard,
  getSprintInfo,
  getCards,
  getReviewBacklog
} from "../../services/SprintApi";
import { getAllPcsta } from "../../services/GroupApi";
import KanbanHeader from "./KanbanHeader";
import KanbanFooter from "./KanbanFooter";
import KanbanCards from "./KanbanCards";
import moment from "moment";
import { showError } from "../../helpers/sweetAlert";

export default {
  watch: {
    async user() {
      if (!this.user.isStudent) {
        this.stages[0] = "Backlog Prometido";
        this.getCardsOfReviewBacklog();
      } else {
        this.getCardsBySprint();
      }
    }
  },
  components: {
    KanbanHeader,
    KanbanFooter,
    KanbanCards
  },
  props: {
    user: Object
  },
  data() {
    return {
      sprintSelected: 1,
      stages: ["Backlog Global", "Backlog da Sprint"],
      blocks: [],
      isFinished: false,
      componentKey: 0,
      currentSprintInfo: {}
    };
  },
  methods: {
    async getCardsOfReviewBacklog() {
      await this.getCurrentSprintInfo();
      const { data } = await getReviewBacklog(
        this.user.groupId,
        this.sprintSelected
      );
      const { data: cardsNow } = await getCards(
        this.user.groupId,
        this.sprintSelected
      );
      cardsNow.forEach(card => {
        card.id = card._id;
        card.statusCard = card.status;
        card.status = card.sprintNumber ? "Backlog da Sprint" : "";
        card.responsibleAvatar = card.responsible.avatar;
      });
      data.forEach(card => {
        card.id += card._id;
        card.statusCard = card.status;
        card.status = "Backlog Prometido";
        card.responsibleAvatar = card.responsible.avatar;
      });
      this.blocks = [...data, ...cardsNow];
    },
    async getCurrentSprintInfo() {
      const self = this;
      try {
        const {
          data: { pcstas }
        } = await getAllPcsta();
        const pcsta = pcstas.find(
          pcsta => pcsta.courseId === this.user.courseId
        );
        const { data: sprintInfo } = await getSprintInfo(pcsta._id);
        if (sprintInfo || sprintInfo.length) {
          const currentSprintInfo = sprintInfo.length
            ? sprintInfo.find(info => info.sprintNumber === this.sprintSelected)
            : sprintInfo;

          if (
            currentSprintInfo &&
            currentSprintInfo.sprintNumber === this.sprintSelected
          ) {
            this.isFinished = currentSprintInfo.isFinished;
          } else {
            this.isFinished = false;
          }
          this.currentSprintInfo = currentSprintInfo;
        } else {
          this.isFinished = false;
          this.currentSprintInfo = {};
        }
      } catch (err) {
        showError(
          self,
          err,
          "Algo deu errado ao trazer as informações da sprint, por favor, tente novamente mais tarde."
        );
      }
    },
    async getCardsBySprint() {
      await this.getCurrentSprintInfo();
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
      const copyOfCard = { ...card };
      const originalPosition = copyOfCard.sprintNumber;
      const originalStatus = copyOfCard.status;
      try {
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
        const registration = {
          who: this.user.username,
          what: `Moveu o cartão para o ${newStage} ${
            newStage === "Backlog Global" ? "" : card.sprintNumber
          }`,
          when: moment()
            .lang("pt-br")
            .format("L")
        };
        copyOfCard.historic.unshift(registration);
        await updateCard(copyOfCard);
      } catch (err) {
        const indexOfCard = this.blocks.findIndex(card => card.id === cardId);
        this.blocks[indexOfCard] = {
          ...card,
          status: originalStatus,
          sprintNumber: originalPosition
        };
        const self = this;
        showError(self, err, "Não foi possível mover o card.");
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
    max-height: 617px;
  }
}

.drag-container {
  font-family: Roboto, sans-serif !important;
}

.drag-column-header {
  padding-bottom: 0;
  div.container {
    padding-bottom: 0;
  }
  h2 {
    font-size: 1em;
  }
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
