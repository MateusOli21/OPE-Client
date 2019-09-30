<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn dark block color="indigo darken-1" v-on="on">Participar de um grupo</v-btn>
      </template>

      <v-card>
        <v-card-title class="pt-7 pb-4 ml-3">Insira o código do grupo</v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-text-field outlined label="Código" v-model="code" prepend-icon="lock"></v-text-field>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                depressed
                outlined
                dark
                color="indigo darken-1"
                class="mx-0 mt-3 mr-3 px-4"
                @click="dialog=false"
              >Fechar</v-btn>
              <v-btn
                depressed
                outlined
                dark
                color="indigo darken-1"
                class="mx-0 mt-3"
                @click="associate"
              >Participar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { sendEntranceCode } from "../../services/GroupApi";
const { email } = JSON.parse(localStorage.getItem("userData"));

export default {
  data() {
    return {
      dialog: false,
      code: ""
    };
  },
  methods: {
    async associate() {
      if (!this.$data.code.length)
        return this.$swal("Por favor, digite o código do grupo.");
      try {
        const response = await sendEntranceCode(this.$data.code, email);
        const userData = JSON.parse(localStorage.getItem("userData"));
        userData.groupId = response.data.group._id;
        localStorage.setItem("userData", JSON.stringify(userData));
        this.$router.push("/grupo-aluno");
        this.$router.go("/grupo-aluno");
      } catch (err) {
        this.$swal("Código inválido.");
      }
    }
  }
};
</script>