<template>
  <div class="descricao-projeto">
    <v-container grid-list-md text-xs-center>
      <div align="left">
        <h1 align="center">{{group.groupName}}</h1>
        <h3>Projeto: {{group.projectName}}</h3>
        <h3>Cliente: {{group.customerName}}</h3>
        <v-switch
          v-model="switchOpen"
          v-if="show"
          :label="`${switchOpen ? 'Fechar Grupo' : 'Abrir Grupo'}`"
          :change="updateOpenGroup"
          @change="updateOpenGroup"
        ></v-switch>
        <div v-if="show">
          Código de acesso:
          <v-text-field
            outlined
            :label="group.entranceCode"
            prepend-icon="lock"
            style="width: 20% !important;"
            disabled
            readonly
          ></v-text-field>
          <div class="my-2" v-if="show">
            <v-btn color="warning" dark @click="generateNewEntranceCode">Gerar outro</v-btn>
          </div>
        </div>
      </div>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 lg6>
          <v-card>
            <v-card-title>Integrantes</v-card-title>
            <v-card height="200px" class="scroll">
              <v-card-text v-for="(member, index) in members" v-bind:key="index">
                <h5>Nome: {{ member.username }}</h5>
                <h5>E-mail: {{ member.email }}</h5>
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>

        <v-flex xs12 sm12 md6 lg6>
          <v-card>
            <v-card-title>Descrição do projeto</v-card-title>
            <v-card height="200px" class="scroll">
              <v-card-text>{{group.description}}</v-card-text>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable */
import { getMembersByGroupId } from "../../services/AuthApi";
import {
  getGroupById,
  updateOpenGroup,
  getNewEntranceCode
} from "../../services/GroupApi";

export default {
  name: "pgGroup",
  data() {
    return {
      show: false,
      dialog: false,
      user: "",
      members: [],
      member: "",
      group: {},
      switchOpen: true
    };
  },
  async beforeCreate() {
    const user = JSON.parse(localStorage.getItem("userData"));
    this.user = user;
    try {
      const members = await getMembersByGroupId(user.groupId);
      this.members = members.data.members;
      const group = await getGroupById(user.groupId);
      this.group = group.data.group;
      this.show = this.group.owner === user.email ? true : false;
    } catch (err) {
      this.$swal(`Algo deu errado:${JSON.stringify(err)}`);
    }
  },
  methods: {
    async updateOpenGroup() {
      try {
        this.group.isOpen = this.switchOpen;
        const {
          data: {
            groupUpdated: { isOpen }
          }
        } = await updateOpenGroup(this.group);
      } catch (err) {
        this.$swal(err.message);
      }
    },
    async generateNewEntranceCode() {
      try {
        const entranceCode = await getNewEntranceCode(this.group._id);
        this.group.entranceCode = entranceCode.data.groupUpdated.entranceCode;
      } catch (err) {
        this.$swal(err.message);
      }
    }
  }
};
</script>

<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
