<template>
  <div>
    <div v-if="!$store.getters.teacherSeeGroupDetails">
      <v-container>
        <v-layout>
          <v-flex>
            <v-row justify="center">
              <v-card width="500px" max-height="550px" class="px-8 py-4">
                <v-card-title>Procure um grupo</v-card-title>
                <v-card-text>
                  <v-select :items="courses" label="Turmas" v-model="classSelected"></v-select>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    depressed
                    block
                    dark
                    color="indigo darken-1"
                    class="mt-2 mb-2"
                    @click="filterOut"
                  >Filtrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-data-table :headers="headers" :items="groups" :items-per-page="10" class="elevation-1">
          <template v-slot:item.action="{ item }">
            <v-icon x-large class="mr-2" @click="details(item)">mdi-arrow-top-right-thick</v-icon>
          </template>
        </v-data-table>
      </v-container>
    </div>
    <div v-if="$store.getters.teacherSeeGroupDetails">
      <v-container>
        <v-layout>
          <v-flex>
            <v-btn color="info" @click="backToHome" fab small dark>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <GroupTab />
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import { getAllPcsta, getGroups } from "../../services/GroupApi";
import { showError } from "../../errors/sweetAlertError";
import { setObject, getGoogleUserData } from "../../services/LocalStorage";
import GroupTab from "../StudentWithGroupPage/GroupTab";

export default {
  data() {
    return {
      courses: [],
      classSelected: "",
      headers: [
        {
          text: "Nome do Grupo",
          align: "left",
          sortable: false,
          value: "groupName"
        },
        { text: "Nome do Cliente", value: "customerName" },
        { text: "Turma", value: "pcsta" },
        { text: "Detalhes", value: "action", sortable: false }
      ],
      groups: []
    };
  },
  components: {
    GroupTab
  },
  async beforeCreate() {
    try {
      const pcstas = await getAllPcsta();
      this.courses = pcstas.data.pcstas.map(pcsta => pcsta.title);
    } catch (err) {
      const self = this;
      showError(
        self,
        err,
        `Não foi possível obter o nome das turmas, por favor, tente novamente mais tarde.`
      );
    }
  },
  methods: {
    async filterOut() {
      const groups = await getGroups(this.classSelected);
      this.groups = groups.data.groups;
    },
    details(group) {
      const user = getGoogleUserData();
      user.groupId = group._id;
      this.$store.commit('teacherSeeGroupDetails', true)
      setObject("googleUserData", user);
      this.actualComponent = "groupTabStudent";
    },
    backToHome() {
      const user = getGoogleUserData();
      user.groupId = "";
      this.$store.commit('teacherSeeGroupDetails', false)
      setObject("googleUserData", user);
      this.actualComponent = "groupTabTeacher";
    }
  }
};
</script>

<style scoped>
</style>
