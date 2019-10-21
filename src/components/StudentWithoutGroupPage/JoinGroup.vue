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
            <v-text-field outlined label="Código" v-model="code" prepend-icon="mdi-lock"></v-text-field>

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
                :disabled="hasNotCode"
                outlined
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
import { joinGroupByCode } from "../../services/GroupApi";
import { getGoogleUserData, setObject } from "../../services/LocalForage";
import { showError } from "../../errors/sweetAlertError";

const updateUserGroupId = async groupId => {
  const user = await getGoogleUserData();
  const googleUserData = JSON.parse(user);
  googleUserData.groupId = groupId;
  await setObject("googleUserData", JSON.stringify(googleUserData));
};

export default {
  data() {
    return {
      dialog: false,
      code: "",
      user: {}
    };
  },
  async beforeCreate() {
    const user = await getGoogleUserData();
    this.user = JSON.parse(user);
  },
  computed: {
    hasNotCode() {
      return !this.code.length || !Number(this.code);
    }
  },
  methods: {
    async associate() {
      try {
        this.$swal.fire({
          title: "Entrando no grupo",
          timer: 1000,
          onBeforeOpen: () => {
            this.$swal.showLoading();
          }
        });
        const response = await joinGroupByCode(this.code, this.user.email);
        await updateUserGroupId(response.data.group._id);
        this.$router.push("/grupo-aluno");
      } catch (err) {
        const self = this;
        showError(self, err, "Código Inválido.");
      }
    }
  }
};
</script>
