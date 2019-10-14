<template>
  <div class="descricao-projeto">
    <v-container grid-list-md text-xs-center>
      <h1 align="center">{{group.groupName}}</h1>
      <div align="left">
        <h3>Projeto: {{group.projectName}}</h3>
        <h3>Cliente: {{group.customerName}}</h3>
        <br />
      </div>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 lg6>
          <v-card>
            <v-card-title>Integrantes</v-card-title>
            <v-card height="200px" class="scroll">
              <v-card-text v-for="(member, index) in members" v-bind:key="index">
                <h5>
                  Nome: {{ member.username }}
                  <v-icon v-if="member.email === group.owner" x-small>mdi-star</v-icon>
                </h5>
                <h5>E-mail: {{ member.email }}</h5>
                <div class="my-2">
                  <v-btn color="error" fab x-small dark @click="kickFromGroup(member)">
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-btn color="primary" fab x-small dark @click="passOwner(member.email)">
                    <v-icon>mdi-star</v-icon>
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
  kickFromGroup,
  updateOpenGroup
} from "../../services/GroupApi";
import { getGoogleUserData } from "../../services/LocalStorage";

export default {
  name: "StudentWithGroup",
  data() {
    return {
      user: getGoogleUserData(),
      members: [],
      group: {}
    };
  },
  async beforeCreate() {
    try {
      const groupId = localStorage.getItem("groupDetails");
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
    } catch (err) {
      this.$swal.fire({
        type: "error",
        title: "Erro",
        text: err.message
      });
    }
  },
  methods: {
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
    async passOwner(newOwnerEmail) {
      const oldOwner = this.group.owner;
      try {
        this.group.owner = newOwnerEmail;
        const {
          data: { group }
        } = await updateOpenGroup(this.group);
        this.show = false;
      } catch (err) {
        this.group.owner = oldOwner;
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
.switch {
  display: flex;
  justify-content: flex-end;
}
.entrance-code {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.text-code {
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
}
</style>
