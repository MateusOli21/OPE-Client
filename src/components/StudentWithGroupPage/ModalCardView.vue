<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" inset>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-eye-outline</v-icon>
        </v-btn>
      </template>
      <v-sheet class="card-view">
        <v-container>
          <v-row>
            <v-col md="8">
              <h1>{{card.title}}</h1>
            </v-col>
            <v-col md="4" class="text-right">
              <div>
                <h1>
                  <span class="cyan--text mr-2">{{card.storyPoints}}</span>
                  <small>Pontos</small>
                </h1>
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col md="6" class="text-left">
              <h4>{{card.statusCard}}</h4>
            </v-col>
            <v-col md="6" class="text-right">
              <h4 :class="prioritiesClass">{{priorityCaptalized}}</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="historic">
                <div v-for="historic in card.historic" :key="historic.id">
                  <div class="register">
                    <div class="d-flex">
                      <v-icon>mdi-account</v-icon>
                      {{historic.who}}
                    </div>
                    {{historic.what}}
                    <div>
                      <small>{{historic.when}}</small>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="description">
                <h3>DESCRIÇÃO</h3>
                <p>{{card.description}}</p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    sheet: false
  }),
  props: {
    card: Object
  },
  computed: {
    priorityCaptalized() {
      let customValue;
      if (this.card.priority === "alta") customValue = "Alta";
      if (this.card.priority === "media") customValue = "Média";
      if (this.card.priority === "baixa") customValue = "Baixa";
      return customValue;
    },
    prioritiesClass() {
      let customClass;
      if (this.card.priority === "alta")
        customClass = "red--text large headline text-uppercase";
      if (this.card.priority === "media") customClass = "amber--text title";
      if (this.card.priority === "baixa") customClass = "green--text";
      return customClass;
    }
  }
};
</script>

<style lang="scss">
div.v-dialog.v-dialog--active.v-bottom-sheet.v-bottom-sheet--inset {
  box-shadow: none;
}

.card-view {
  height: 1000px;
  border-radius: 100px;
  z-index: 999999;
  div.container {
    width: 85%;
    position: relative;
    top: 5%;
    h1,
    h4 {
      font-weight: 300;
    }

    h1 small {
      font-size: 0.5em;
    }
  }
}

.description {
  border: 0.1px dashed black;
  padding: 30px;
  h3 {
    font-weight: 400;
  }
  p {
    margin-top: 20px;
    text-align: justify;
    font-size: 0.9em;
    font-family: Roboto, sans-serif !important;
  }
}

.historic {
  height: 250px;
  overflow-y: scroll;
  border: 1px solid rgba(0, 0, 0, 0.164);
}

.register {
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.164);
  padding: 10px;
}
</style>
