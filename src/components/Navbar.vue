<template>
  <nav>
    <v-toolbar flat color="indigo darken-1">
      <v-toolbar-title class="text-uppercase white--text">
        <v-img
          src="https://www.impacta.edu.br/themes/wc_agenciar3/images/logo-new.png"
          height="50"
          width="200"
        ></v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <span style="margin-right: 15px; color: white;">{{user.username}}</span>
      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <v-btn
            fab
            small
            text
            dark
            slot="activator"
            v-on="on"
          ><v-img style="border-radius: 35px; width: 30px" :src="user.avatar" /></v-btn>
        </template>

        <v-card width="300">
          <v-list>
            <v-list-item class="avatar">
              <v-avatar>
                <v-img :src="user.avatar"></v-img>
              </v-avatar>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title pb-2">{{user.username}}</v-list-item-title>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-list-item-subtitle v-on="{ ...tooltip}">{{user.email}}</v-list-item-subtitle>
                  </template>
                  <span>{{user.email}}</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-list-item-subtitle v-on="{ ...tooltip}">{{course}}</v-list-item-subtitle>
                  </template>
                  <span >{{course}}</span>
                </v-tooltip>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list nav dense>
            <v-list-item link v-on:click="logout">
              <v-list-item-icon>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar>
  </nav>
</template>

<script>
import { logout } from "../services/AuthApi";
import { getGoogleUserData, clearStorage } from "../services/LocalForage";
import { showError } from "../errors/sweetAlertError";

export default {
  data() {
    return {
      user: ""
    };
  },
  computed: {
    course(){
      return this.user.pcsta ? this.user.pcsta.split("- ")[1] : ""
    }
  },
  methods: {
    async logout() {
      try {
        await logout(this.user.email);
        await clearStorage();
        this.$router.push("/");
      } catch (err) {
        const self = this;
        showError(
          self,
          err,
          "Não foi possível realizar Logout, por favor, tente novamente mais tarde."
        );
      }
    }
  },
  async created() {
    const user = await getGoogleUserData();
    this.user = JSON.parse(user)
  }
};
</script>

<style scoped>
.links {
  color: white;
  text-decoration: none;
}

.avatar{
  float: left;
  padding-top: 15px;
}
</style>

