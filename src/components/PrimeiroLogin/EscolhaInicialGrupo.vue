<template>
    <v-flex xs12 sm12 md12 lg12>
        <v-row align="center" justify="center" style="height: 350px;" class="mt-10">

          <v-card class="zoom pa-6 mx-12" >
            <v-responsive>
              <v-img src="@/assets/add-user2.png" class="estilo-imagem mb-10"></v-img>
            </v-responsive>
            <!--
            <v-btn dark block color="indigo darken-1">Participar de um grupo</v-btn>
            -->
            <EntrarGrupo/>
          </v-card>

          <v-card class="zoom pa-6 ma-3">
            <v-img src="@/assets/add-group1.png" class="estilo-imagem mb-10"></v-img>
            <v-spacer></v-spacer>
            <!--
            <v-btn dark block class="" color="indigo darken-1">Criar um grupo</v-btn>
            -->
            <FormGrupo/>
          </v-card>
          


        </v-row>
     </v-flex>
</template>


<script>

import FormGrupo from '@/components/PrimeiroLogin/FormGrupo';
import EntrarGrupo from '@/components/PrimeiroLogin/EntrarGrupo';


export default {
    name: 'EscolhaDeGrupo',
    components:{
      FormGrupo,
      EntrarGrupo
    }
}
</script>

<style scoped>

.estilo-imagem{
  width: 300px;
  max-width: 250px;
  max-height: 250px;
}


.zoom {
  padding: 50px;
  background-color: #E0E0E0;
  transition: transform .2s; /* Animation */
  margin: 0 auto;
}

.zoom:hover {
  transform: scale(1.1); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
</style>