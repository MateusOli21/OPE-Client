<template>
  <div>
    <div>
      <v-container v-if="!$store.getters.teacherSeeGroupDetails">
        <v-layout>
          <v-flex>
            <v-row justify="center">
              <v-card width="500px" max-height="550px" class="px-8 py-4">
                <v-card-title>Iniciar Sprints</v-card-title>
                <v-card-text>
                  <v-select :items="courses" label="Turmas" v-model="classSelected"></v-select>
                  <v-select :items="courses" label="Atividades Contínua" v-model="classSelected"></v-select>
                  <v-select :items="courses" label="Sprints" v-model="classSelected"></v-select>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    depressed
                    block
                    dark
                    color="indigo darken-1"
                    class="mt-2 mb-2"
                    @click="iniciarSprint"
                  >Iniciar Sprint</v-btn>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <SprintTab v-if="$store.getters.teacherSeeGroupDetails"/>
  </div>
</template>

<script>
import SprintTab from '../StudentWithGroupPage/SprintTab'
import { getGoogleUserData } from '../../services/LocalStorage'

export default {
  data() {
    return {
      user: getGoogleUserData(),
      courses: []
    }
  },
  components: {
    SprintTab
  },
  methods: {
    iniciarSprint() {
      return
    }
  }
}
</script>

<style scoped>
</style>
