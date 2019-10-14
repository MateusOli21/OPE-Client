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
                outlined
                color="indigo darken-1"
                class="ml-3 px-4"
                :disabled="requiredFieldsIsEmpty"
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
import { getGoogleUserData, setObject } from "../../services/LocalStorage";
import { showError } from "../../errors/sweetAlertError";

const updateUserGroupId = groupId => {
  const googleUserData = getGoogleUserData();
  googleUserData.groupId = groupId;
  setObject("googleUserData", googleUserData);
};

export default {
  data() {
    const googleUserData = getGoogleUserData();

    return {
      dialog: false,
      groupName: "",
      projectName: "",
      customerName: "",
      description: "",
      pcsta: googleUserData.pcsta,
      owner: googleUserData.email
    };
  },
  computed: {
    requiredFieldsIsEmpty() {
      const dataObject = this.$data;
      const fields = Object.keys(this.$data);
      const someFieldVoid = fields.find(field => {
        if (
          !dataObject[field].length &&
          field !== "dialog" &&
          field !== "description"
        )
          return field;
      });
      if (someFieldVoid) return true;
      return false;
    }
  },
  methods: {
    async create() {
      try {
        const response = await createGroup({
          group: {
            groupName: this.groupName,
            projectName: this.projectName,
            customerName: this.customerName,
            description: this.description,
            owner: this.owner
          },
          pcsta: this.pcsta,
          courseId: this.user.courseId
        });
        updateUserGroupId(response.data.group._id);
        this.$router.push("/grupo-aluno");
      } catch (err) {
        const self = this;
        showError(
          self,
          err,
          `Não foi possível criar o grupo ${this.groupName}, por favor, tente novamente mais tarde.`
        );
      }
    }
  }
};
</script>
