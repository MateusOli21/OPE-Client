<template>
  <v-dialog width="30%" v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn class="btn-create-card" v-on="on">+ Adicionar um novo cartão</v-btn>
    </template>

    <v-card>
      <v-card-title class="pt-7 ml-3">Criar cartão</v-card-title>
      <v-card-text>
        <v-form class="px-3 pt-5">
          <v-text-field
            outlined
            label="Título"
            name="title"
            prepend-icon="mdi-format-title"
            v-model="card.title"
            :rules="[(v) => (v.length > 0 || wasCleaned) || 'Campo obrigatório']"
          ></v-text-field>
          <v-select
            :items="members"
            v-model="card.responsibleObject"
            return-object
            prepend-icon="mdi-account"
            label="Nome do responsável"
            :rules="[(v) => (!!v.text || wasCleaned) || 'Campo obrigatório']"
            required
          ></v-select>
          <v-select
            :items="priorities"
            v-model="card.priority"
            prepend-icon="mdi-exclamation"
            label="Prioridade"
            :rules="[(v) => (!!v || wasCleaned) || 'Campo obrigatório']"
            required
          ></v-select>
          <v-select
            :items="sprintNumbers"
            v-model="card.sprintNumber"
            prepend-icon="mdi-ballot-outline"
            label="Número da sprint"
            :rules="[(v) => (!!v.toString() || wasCleaned) || 'Campo obrigatório']"
            required
          ></v-select>
          <v-select
            :items="statusCard"
            v-model="card.statusCard"
            prepend-icon="mdi-traffic-light"
            label="Status"
            :rules="[(v) => (!!v || wasCleaned) || 'Campo obrigatório']"
            required
          ></v-select>
          <v-select
            :items="storyPoints"
            v-model="card.storyPoints"
            prepend-icon="mdi-crosshairs-gps"
            label="Pontos de estória"
            :rules="[(v) => (!!v || wasCleaned) || 'Campo obrigatório']"
            required
          ></v-select>
          <v-textarea
            outlined
            label="Descrição"
            v-model="card.description"
            height="100"
            prepend-icon="mdi-pencil"
          ></v-textarea>
          <div class="flex-grow-1"></div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="indigo darken-1" class="ml-3 px-4" @click="dialog = false">Fechar</v-btn>
            <v-btn
              outlined
              color="indigo darken-1"
              class="ml-3 px-4"
              :disabled="requiredFieldsIsEmpty"
              @click="() => { addCard(); dialog = false }"
            >Criar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { createCard } from "../../services/SprintApi";
import { getMembersByGroupId } from "../../services/AuthApi";
import { getGoogleUserData } from "../../services/LocalForage";

const formatMembersList = membersList =>
  membersList.map(member => {
    return {
      text: member.username,
      value: member.username,
      avatar: member.avatar
    };
  });

export default {
  async beforeMount() {
    const user = await getGoogleUserData();
    this.user = JSON.parse(user);
    const {
      data: { members }
    } = await getMembersByGroupId(this.user.groupId);
    this.members = formatMembersList(members);
  },
  props: {
    oncreate: Function
  },
  data() {
    return {
      user: {},
      dialog: false,
      card: {
        title: "",
        responsibleObject: {
          text: "",
          avatar: ""
        },
        priority: "",
        description: "",
        storyPoints: "",
        status: "",
        statusCard: "",
        sprintNumber: 0,
        historic: []
      },
      statusCard: ["Pendente", "Fazendo", "Concluído", "Bloqueado"],
      stages: ["Backlog Global", "Backlog da Sprint"],
      priorities: [
        { text: "Alta", value: "alta" },
        { text: "Média", value: "media" },
        { text: "Baixa", value: "baixa" }
      ],
      sprintNumberForSprintSelect: [1, 2, 3, 4, 5, 6, 7, 8],
      sprintNumbers: [
        { text: "Backlog Global", value: 0 },
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ],
      storyPoints: [1, 2, 3, 4, 5, 6, 7, 8],
      members: [],
      wasCleaned: false
    };
  },
  computed: {
    requiredFieldsIsEmpty() {
      const hasFieldVoid = Object.keys(this.card).find(field => {
        if (field === "responsibleObject" && !this.card[field].text.length)
          return true;
        if (
          this.card[field].toString().length < 1 &&
          field !== "description" &&
          field !== "historic" &&
          field !== "status"
        )
          return true;
      });
      return !!hasFieldVoid;
    }
  },
  methods: {
    cleanCreateCard() {
      this.card = {
        title: "",
        responsibleObject: {
          text: "",
          avatar: ""
        },
        priority: "",
        description: "",
        storyPoints: "",
        status: "",
        sprintNumber: 0,
        historic: []
      };
      this.wasCleaned = true
    },
    async addCard() {
      this.card.groupId = this.user.groupId;
      this.card.responsible = {
        name: this.card.responsibleObject.text,
        avatar: this.card.responsibleObject.avatar
      };
      this.card.status = this.card.statusCard
      try {
        await createCard(this.card);
        this.cleanCreateCard();
        this.oncreate();
      } catch (err) {}
    }
  }
};
</script>

<style lang="scss">
.btn-create-card {
  border-radius: 10px;

  span.v-btn__content {
    font-size: 0.875em;
  }
}
</style>
