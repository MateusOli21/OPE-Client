<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn dark block color="indigo darken-1" v-on="on">Criar um grupo</v-btn>
      </template>

      <v-card>
        <v-card-title class="pt-7 ml-3">Criar um grupo</v-card-title>
        <v-card-text>
          <v-form class="px-3 pt-5">
            <v-text-field outlined label="Nome do grupo" v-model="groupName" prepend-icon="group"></v-text-field>
            <v-text-field
              outlined
              label="Nome do projeto"
              v-model="projectName"
              prepend-icon="folder"
            ></v-text-field>
            <v-text-field
              outlined
              label="Nome do cliente"
              v-model="customerName"
              prepend-icon="work"
            ></v-text-field>
            <v-textarea
              outlined
              label="Descrição do projeto"
              height="100"
              v-model="description"
              prepend-icon="edit"
            ></v-textarea>
            <div class="flex-grow-1"></div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed outlined dark color="indigo darken-1" @click="dialog">Fechar</v-btn>

              <v-btn
                depressed
                outlined
                dark
                color="indigo darken-1"
                class="ml-3 px-4"
                @click="create"
              >Criar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import { createGroup } from "../../services/GroupApi";

export default {
  data() {
    const { pcsta, email } = JSON.parse(localStorage.getItem("userData"));

    return {
      dialog: false,
      groupName: "",
      projectName: "",
      customerName: "",
      description: "",
      pcsta,
      email
    };
  },
  methods: {
    async create() {
      const group = this.$data;
      delete group.dialog
      await createGroup(group);
    }
  }
};
</script>