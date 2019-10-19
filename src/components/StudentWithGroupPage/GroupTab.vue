<template>
  <div class="projectDescription">
    <v-container grid-list-md text-xs-center>
      <div class="titles">
        <h3 class="subTitle">
          Projeto:
          <span>{{group.projectName}}</span>
        </h3>
        <h1 class="mainTitle">{{group.groupName}}</h1>
        <h3 class="subTitle">
          Cliente:
          <span>{{group.customerName}}</span>
        </h3>
      </div>
      <v-divider></v-divider>
      <div class="actionButtons">
        <div class="switch">
          <v-switch
            v-if="user.email === group.owner"
            v-model="switchOpen"
            :label="`${switchOpen ? 'Fechar Grupo' : 'Abrir Grupo'}`"
            @change="updateOpenGroup"
          ></v-switch>
        </div>

        <div v-if="user.email === group.owner" class="entrance-code">
          <v-dialog persistent v-model="dialog" width="30%">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" style="text-transform: none;" color="primary">Gerar código de entrada</v-btn>
            </template>

            <v-card>
              <v-card-title class="pt-7 ml-3">Gerar novo código de entrada</v-card-title>
              <v-card-text>
                <v-form class="px-3 pt-5">
                  <v-text-field outlined prepend-icon="code" disabled v-model="group.entranceCode"></v-text-field>
                  <div class="flex-grow-1"></div>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      depressed
                      outlined
                      dark
                      color="indigo darken-1"
                      @click="dialog=false"
                    >Fechar</v-btn>

                    <v-btn
                      outlined
                      color="indigo darken-1"
                      class="ml-3 px-4"
                      @click="generateNewEntranceCode"
                    >Gerar</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
        <v-btn v-if="user.isStudent" color="error" @click="exitFromGroup" fab small dark>
          <v-icon>mdi-account-arrow-right</v-icon>
        </v-btn>
      </div>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 lg6>
          <v-card class="mainMembers">
            <v-card-title class="membersTitle">Integrantes</v-card-title>
            <v-card class="members scroll">
              <v-card-text v-for="(member, index) in members" v-bind:key="index">
                <h5>
                  Nome: {{ member.username }}
                  <v-icon v-if="member.email === group.owner" x-small>mdi-star</v-icon>
                </h5>
                <h5>E-mail: {{ member.email }}</h5>
                <div class="my-2">
                  <v-btn
                    color="error"
                    v-if="(!user.isStudent) || ((user.email !== member.email) && user.email === group.owner)"
                    fab
                    x-small
                    dark
                    @click="kickFromGroup(member)"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-btn
                    color="primary"
                    v-if="((member.email !== group.owner) && !user.isStudent) || ((user.email !== member.email) && user.email === group.owner)"
                    fab
                    x-small
                    dark
                    @click="passOwner(member.email)"
                  >
                    <v-icon>mdi-star</v-icon>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>

        <v-flex xs12 sm12 md6 lg6>
          <v-card class="mainDetails">
            <v-card-title class="detailsTitle">Descrição do projeto</v-card-title>
            <v-card class="scroll details">
              <v-card-text>{{group.description}}</v-card-text>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { getMembersByGroupId } from "../../services/AuthApi";
import { getGoogleUserData, setObject } from "../../services/LocalStorage";
import {
  getGroupById,
  updateOpenGroup,
  getNewEntranceCode,
  kickFromGroup,
  exitFromGroup
} from "../../services/GroupApi";

export default {
  data() {
    return {
      dialog: false,
      user: getGoogleUserData(),
      members: [],
      group: {},
      switchOpen: true
    };
  },
  async beforeCreate() {
    try {
      const { groupId } = getGoogleUserData();
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
      this.switchOpen = group.isOpen;
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
        await updateOpenGroup(this.group);
      } catch (err) {
        this.switchOpen = !bool;
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
        await kickFromGroup(member.email);
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
      const response = await this.$swal.fire({
        title: "Você tem certeza que deseja sair do grupo?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, eu tenho!",
        cancelButtonText: "Cancelar"
      });
      if (response.value) {
        try {
          this.$swal.fire({
            title: "Removendo do grupo",
            onBeforeOpen: () => {
              this.$swal.showLoading();
            }
          });
          await exitFromGroup(this.user.email, this.user.groupId);
          this.user.groupId = null;
          setObject("googleUserData", this.user);
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
    },
    async passOwner(newOwnerEmail) {
      const oldOwner = this.group.owner;
      try {
        this.group.owner = newOwnerEmail;
        await updateOpenGroup(this.group);
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
.actionButtons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.projectDescription {
  font-family: sans-serif;
}
.titles {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}
.mainTitle {
  display: inline;
}
.subTitle {
  display: inline;
  margin-right: 10px;
}
.subTitle span {
  font-weight: normal;
}
.scroll {
  overflow-y: auto;
}
.switch {
  display: block;
  width: 150px;
}
.exitFromGroup {
  display: inline-block;
}
.entrance-code {
  display: inline-block;
  padding-bottom: 10px;
  margin-right: 85px;
}
.text-code {
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
}
.mainMembers {
  height: 400px;
}
.mainDetails {
  height: 400px;
}
.members {
  height: 90%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  box-shadow: none;
}
.details {
  height: 90%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  box-shadow: none;
  text-align: justify;
  font-style: italic;
}

.details .v-card__text {
  font-size: 1.3rem;
  color: rgba(0, 0, 0, 0.452);
}

.detailsTitle {
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
}
.membersTitle {
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
}
</style>
