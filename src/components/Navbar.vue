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

      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <v-btn
            fab
            small
            text
            dark
            slot="activator"
            style="width: 150px !important"
            v-on="on"
          >{{user.username}}</v-btn>
        </template>

        <v-card width="300">
          <v-list class="dropDownMenu">
            <v-list-item class="avatar">
              <v-avatar>
                <v-img :src="user.avatar"></v-img>
              </v-avatar>
            </v-list-item>

            <v-list-item class="username">
              <v-list-item-content>
                <v-list-item-title class="title pb-2">{{user.username}}</v-list-item-title>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-list-item-subtitle v-on="{ ...tooltip}">{{user.email}}</v-list-item-subtitle>
                  </template>
                  <span class="email">{{user.email}}</span>
                </v-tooltip>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list nav dense>
            <v-list-item link v-on:click="logout">
              <v-list-item-icon>
                <v-icon>exit_to_app</v-icon>
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
import { getGoogleUserData, clearStorage } from "../services/LocalStorage";
import { showError } from "../errors/sweetAlertError";

export default {
  data() {
    return {
      user: ""
    };
  },
  methods: {
    async logout() {
      try {
        await logout();
        clearStorage();
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
  created() {
    this.user = getGoogleUserData();
  }
};
</script>

<style scoped>
.links {
  color: white;
  text-decoration: none;
}

.dropDownMenu {
  display: flex;
}

.avatar {
  align-self: center;
}

.username {
  flex: 1;
}

.email {
  flex: 1;
}
</style>

