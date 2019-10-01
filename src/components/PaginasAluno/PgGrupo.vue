<template>
  <div class="descricao-projeto">
    <v-container grid-list-md text-xs-center>
      <div align="left">
        <h1 align="center">{{group.groupName}}</h1>
        <h3>Projeto: {{group.projectName}}</h3>
        <h3>Cliente: {{group.customerName}}</h3>
        <v-switch
          v-if="show"
          v-model="switchOpen"
          :label="`${switchOpen ? 'Fechar Grupo' : 'Abrir Grupo'}`"
          @change="updateOpenGroup"
        ></v-switch>
        <div v-if="show">
          Código de acesso:
          <span v-text="group.entranceCode"></span>
          <div class="my-2" v-if="show">
            <v-btn color="warning" dark @click="generateNewEntranceCode">Gerar outro</v-btn>
          </div>
        </div>
        <v-btn color="error" @click="exitFromGroup" fab small dark>
          <v-icon>mdi-account-arrow-right</v-icon>
        </v-btn>Sair do grupo
      </div>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 lg6>
          <v-card>
            <v-card-title>Integrantes</v-card-title>
            <v-card height="200px" class="scroll">
              <v-card-text v-for="(member, index) in members" v-bind:key="index">
                <h5>Nome: {{ member.username }}</h5>
                <h5>E-mail: {{ member.email }}</h5>
                <div class="my-2" v-if="show && member.email !== group.owner">
                  <v-btn color="error" fab x-small dark @click="kickFromGroup(member)">
                    <v-icon>close</v-icon>
                  </v-btn>
                </div>
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
  getNewEntranceCode,
  kickFromGroup,
  exitFromGroup
} from "../../services/GroupApi";

export default {
  name: "StudentWithGroup",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("userData")),
      members: [],
      group: {},
      switchOpen: true,
      show: false
    };
  },
  async beforeCreate() {
    try {
      const { groupId, email } = JSON.parse(localStorage.getItem("userData"));
      const [
        {
          data: { members }
        },
        {
          data: { group }
        }
      ] = await Promise.all([
        getMembersByGroupId(groupId),
        getGroupById(groupId)
      ]);
      this.members = members;
      this.group = group;
      this.switchOpen = group.isOpen
      this.show = this.group.owner === email ? true : false;
    } catch (err) {
        this.$swal.fire({
          type: "error",
          title: "Erro",
          text: err.message
        });
    }
  },
  methods: {
    async updateOpenGroup(bool) {
      try {
        this.group.isOpen = bool;
        const { status } = await updateOpenGroup(this.group);
      } catch (err) {
        this.switchOpen = !bool
        this.$swal.fire({
          type: "error",
          title: "Erro",
          text: err.message
        });
      }
    },
    async generateNewEntranceCode() {
      try {
        const entranceCode = await getNewEntranceCode(this.group._id);
        this.group.entranceCode = entranceCode.data.groupUpdated.entranceCode;
      } catch (err) {
        this.$swal.fire({
          type: "error",
          title: "Erro",
          text: err.message
        });
      }
    },
    async kickFromGroup(member) {
      try {
        const entranceCode = await kickFromGroup(member.email);
        this.members = this.members.filter(
          currentMember => currentMember.email !== member.email
        );
      } catch (err) {
        this.$swal.fire({
          type: "error",
          title: "Erro",
          text: err.message
        });
      }
    },
    async exitFromGroup() {
      try {
        const entranceCode = await exitFromGroup(this.user.email, this.user.groupId);
        this.user.groupId = null;
        localStorage.setItem("userData", JSON.stringify(this.user));
        this.$router.push("/escolhe-grupo");
        this.$router.go("/escolhe-grupo");
      } catch (err) {
        this.$swal.fire({
          type: "error",
          title: "Erro",
          text: err.message
        });
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
