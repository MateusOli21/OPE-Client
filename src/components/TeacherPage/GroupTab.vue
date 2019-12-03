<template>
  <div>
    <div v-if="!$store.getters.teacherSeeGroupDetails">
      <v-container>
        <v-row>
          <v-col md="12">
            <v-card class="px-8 py-4">
              <v-card-title>
                Procure um grupo
                <v-spacer></v-spacer>
                <v-select
                  :items="courses"
                  label="Turmas"
                  @change="filterOut"
                  v-model="classSelected"
                ></v-select>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="groups"
                :items-per-page="10"
                class="elevation-1"
              >
                <template v-slot:item.action="{ item }">
                  <v-icon x-large class="mr-2" @click="details(item)">mdi-arrow-right-bold</v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-if="!!$store.getters.teacherSeeGroupDetails">
      <v-container>
        <v-layout>
          <v-flex>
            <v-btn color="primary" @click="backToHome" fab small dark>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn color="primary" class="f-right" large dark>Sprint</v-btn>
            <GroupTab :groupId="$store.getters.teacherSeeGroupDetails" />
            <SprintTab />
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import { getAllPcsta, getGroups } from "../../services/GroupApi";
import { showError } from "../../helpers/sweetAlert";
import { setObject, getGoogleUserData } from "../../services/LocalForage";
import GroupTab from "../StudentWithGroupPage/GroupTab";
import SprintTab from "../StudentWithGroupPage/SprintTab";

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
      groups: [],
      pcstas: []
    };
  },
  components: {
    GroupTab,
    SprintTab
  },
  async beforeCreate() {
    const user = await getGoogleUserData();
    this.user = JSON.parse(user);
    try {
      const pcstas = await getAllPcsta();
      this.pcstas = pcstas.data ? pcstas.data.pcstas : [];
      this.courses = pcstas.data
        ? pcstas.data.pcstas.map(pcsta => pcsta.title)
        : [];
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
    async filterOut(classSelected) {
      const groups = await getGroups(classSelected);
      this.groups = groups.data.groups;
    },
    async details(group) {
      const user = this.user;
      user.groupId = group._id;
      user.courseId = this.pcstas.length ? this.pcstas.find(pcsta => pcsta.title === group.pcsta).courseId : "";
      user.pcsta = group.pcsta;
      user.isStudent = true;
      console.log('user:', user, 'group:', group);
      this.$store.commit("teacherSeeGroupDetails", group._id);
      await setObject("googleUserData", JSON.stringify(user));
      this.actualComponent = "groupTabStudent";
    },
    async backToHome() {
      const user = this.user;
      user.groupId = "";
      user.courseId = "";
      user.pcsta = "";
      user.isStudent = false;
      this.$store.commit("teacherSeeGroupDetails", false);
      await setObject("googleUserData", JSON.stringify(user));
      this.actualComponent = "groupTabTeacher";
    }
  }
};
</script>

<style scoped>
.f-right {
  float: right;
}
</style>
