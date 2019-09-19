<template>
  <v-menu offset-y open-on-hover>
    <template v-slot:activator="{on}">
      <v-btn fab small text dark slot="activator" v-on="on" @click="drawer = !drawer" style="width: 150px !important">
        <v-icon small>account_circle</v-icon>
      </v-btn>
    </template>

    <v-card width="300">
      <v-list>
        <v-list-item>
          <v-avatar size="75" class="grey lighten-2">
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
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>assignment_ind</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Meu perfil</v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>info</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Ajuda</v-list-item-title>
        </v-list-item>

        <v-list-item link v-on:click="logout">
          <v-list-item-icon>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props() {
    return {
      user: "ss"
    };
  },
  methods: {
    logout: function () {
      localStorage.clear()
      this.$router.push('/')
      this.$router.go('/')
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem("userData"));
    this.user = user;
    setTimeout(() => this.$forceUpdate(), 3000)
  }
};
</script>
