<template>
  <kanban-board :stages="stages" :blocks="blocks" @update-block="updateBlock">
    <div v-for="stage in stages" :slot="stage" :key="stage">
      <h2>{{ stage }}</h2>
      <!-- TODO; EDITAR A ESTILIZAÇÃO DA COLUNA -->
      <div class="select-sprint" v-if="stage === 'Backlog da Sprint'">
        <v-select
          style="width:30%;"
          :items="[1,2,3,4,5,6,7,8]"
          v-model="sprintDefault"
          label="Sprint"
        ></v-select>
        <span>Data de início: {{sprintStartDate}}</span>
        <span>Data final: {{sprintEndDate}}</span>
      </div>
    </div>
    <div v-for="block in blocks" :slot="block.id" :key="block.id">
      <h4>{{ block.title }}</h4>
      <img :src="block.responsibleAvatar" alt="responsibleAvatar" />
      <div :class="getPriorityColor(block.priority)"></div>
      <span v-text="block.statusCard"></span>
      <!-- TODO; VER DETALHES DO CARD -->
      <!-- TODO; ADICIONAR AS OUTRAS PROPRIEDADES E FUNCIONALIDADES DO CARD -->
      <!-- TODO; EDITAR A ESTILIZAÇÃO DO CARD -->
    </div>
    <div class="k-footer" v-for="stage in stages" :key="stage" :slot="`footer-${stage}`">
      <v-dialog persistent v-model="dialog" width="30%">
        <template v-slot:activator="{ on }">
          <button
            class="btn-create-card"
            @click="selectStage(stage)"
            v-on="on"
          >+ Adicionar um novo cartão</button>
        </template>

        <v-card>
          <v-card-title class="pt-7 ml-3">Criar cartão</v-card-title>
          <v-card-text>
            <v-form class="px-3 pt-5">
              <v-text-field outlined label="Nome do grupo" prepend-icon="mdi-group" required></v-text-field>
              <v-textarea
                outlined
                label="Descrição do projeto"
                height="100"
                prepend-icon="mdi-pencil"
              ></v-textarea>
              <div class="flex-grow-1"></div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed outlined dark color="indigo darken-1" @click="dialog=false">Fechar</v-btn>

                <v-btn outlined color="indigo darken-1" class="ml-3 px-4" @click="addCard()">Criar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </kanban-board>
</template>

<script>
import { getGoogleUserData } from "../../services/LocalForage";

export default {
  data() {
    return {
      dialog: false,
      user: "",
      sprintDefault: 1,
      sprintStartDate: "10/10/2019",
      sprintEndDate: "26/10/2019",
      createCardTo: '',
      stages: ["Backlog Global", "Backlog da Sprint"],
      blocks: [
        {
          id: 1,
          status: "Backlog Global",
          title: "Desenvolver tela de login",
          statusCard: "Fazendo",
          responsibleName: "Saleh",
          responsibleAvatar:
            "https://lh6.googleusercontent.com/-XwfxOUTfwG8/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3relenkpklx1PIIZnXus3R2pjzZGFQ/s50/photo.jpg",
          priority: "alta",
          description: "Sem descrição",
          storyPoints: 8,
          historic: [
            {
              who: "Saleh",
              when: "16/10/2019",
              what: "Criou o card"
            }
          ],
          groupId: "5da7c92ea0c1ce1862381f29",
          sprintNumber: 0,
          createdAt: "16/10/2019",
          updatedAt: "16/10/2019"
        },
        {
          id: 2,
          status: "Backlog Global",
          title: "Desenvolver tela de cadastro",
          statusCard: "Pendente",
          responsibleName: "Saleh",
          responsibleAvatar:
            "https://lh6.googleusercontent.com/-XwfxOUTfwG8/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3relenkpklx1PIIZnXus3R2pjzZGFQ/s50/photo.jpg",
          priority: "media",
          description: "Sem descrição",
          storyPoints: 8,
          historic: [
            {
              who: "Saleh",
              when: "16/10/2019",
              what: "Criou o card"
            }
          ],
          groupId: "5da7c92ea0c1ce1862381f29",
          sprintNumber: 0,
          createdAt: "16/10/2019",
          updatedAt: "16/10/2019"
        }
      ]
    };
  },
  methods: {
    updateBlock(cardId, newStage) {
      // método sem implementação ainda, mas a funcionalidade esta ok
      return { cardId, newStage };
    },
    getPriorityColor(priority) {
      if (priority === "alta") return "k-red";
      if (priority === "media") return "k-yellow";
      if (priority === "baixa") return "k-green";
    },
    addCard() {
      const id = new Date().getSeconds();
      const card = {
        id,
        status: this.createCardTo,
        title: "Desenvolver tela de Kanban",
        statusCard: "Feito",
        responsibleName: "Saleh",
        responsibleAvatar:
          "https://lh6.googleusercontent.com/-XwfxOUTfwG8/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3relenkpklx1PIIZnXus3R2pjzZGFQ/s50/photo.jpg",
        priority: "baixa",
        description: "Sem descrição",
        storyPoints: 8,
        historic: [
          {
            who: "Saleh",
            when: "16/10/2019",
            what: "Criou o card"
          }
        ],
        groupId: "5da7c92ea0c1ce1862381f29",
        sprintNumber: 0,
        createdAt: "16/10/2019",
        updatedAt: "16/10/2019"
      };
      this.blocks.push(card);
    },
    selectStage(stage) {
      this.createCardTo = stage
    }
  },
  async beforeMount() {
    const user = await getGoogleUserData();
    this.user = JSON.parse(user)
    if (!this.user.isStudent)
      this.stages = ["Backlog Prometido", "Backlog da Sprint"];
  }
};
</script>

<style lang="scss">
@import "node_modules/vue-kanban/src/assets/kanban.scss";

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
  background-color: white;
  border: 1px solid #a5a4a4;
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
    background: (white, 1);
  }
}

.k-footer {
  margin: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .btn-create-card {
    width: 50%;
    border-radius: 10px;
    border: 1px solid #a5a4a4;
    padding: 10px;
    outline: none;
    background-color: white;
  }

  .btn-create-card:active {
    transform: scale(0.97, 0.97);
  }

  .select-sprint {
    h4 {
      font-weight: normal !important;
    }
  }
}
</style>
