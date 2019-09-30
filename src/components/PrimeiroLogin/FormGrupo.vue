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
            <v-text-field
              outlined
              label="Nome do grupo"
              prepend-icon="group"
              v-model="groupName"
              required
              :rules="[() => groupName.length > 0 || 'Campo obrigatório']"
            ></v-text-field>
            <v-text-field
              outlined
              label="Nome do projeto"
              prepend-icon="folder"
              v-model="projectName"
              required
              :rules="[() => projectName.length > 0 || 'Campo obrigatório']"
            ></v-text-field>
            <v-text-field
              outlined
              label="Nome do cliente"
              prepend-icon="work"
              v-model="customerName"
              required
              :rules="[() => customerName.length > 0 || 'Campo obrigatório']"
            ></v-text-field>
            <v-textarea
              outlined
              label="Descrição do projeto"
              height="100"
              prepend-icon="edit"
              v-model="description"
            ></v-textarea>
            <div class="flex-grow-1"></div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed outlined dark color="indigo darken-1" @click="dialog=false">Fechar</v-btn>

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
      owner: email
    };
  },
  methods: {
    async create() {
      try {
        const dataObject = this.$data;
        const fields = Object.keys(this.$data);
        const someFieldVoid = fields.find(field => {
          if (!dataObject[field].length && field !== "dialog" && field !== "description") return field;
        });
        if (someFieldVoid) {
          return this.$swal("Por favor, preencha todos os campos.");
        } else {
          const response = await createGroup({
            group: {
              groupName: dataObject.groupName,
              projectName: dataObject.projectName,
              customerName: dataObject.customerName,
              description: dataObject.description,
              owner: dataObject.owner
            },
            pcsta: dataObject.pcsta
          });
          const userData = JSON.parse(localStorage.getItem("userData"))
          userData.groupId = response.data.group._id
          localStorage.setItem('userData', JSON.stringify(userData))
          this.$router.push('/grupo-aluno')
          this.$router.go('/grupo-aluno')
        }
      } catch (err) {
        return this.$swal(
          "Tivemos um problema com o nosso servidor, por favor tente novamente mais tarde."
        );
      }
    }
  }
};
</script>