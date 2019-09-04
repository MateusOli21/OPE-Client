<template>
    <div class="text-center">
        <v-dialog persistent v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
            <v-btn dark block color="indigo darken-1" v-on="on">Criar um grupo</v-btn>
        </template>
        
        <v-card>
            <v-card-title class="pt-7 ml-3" >Criar um grupo</v-card-title>
            <v-card-text>
              <v-form class="px-3 pt-5">
                  <v-text-field outlined label="Nome do grupo" v-model="nomeGrupo" prepend-icon="group"></v-text-field>
                  <v-text-field outlined label="Nome do projeto" v-model="nomeProjeto" prepend-icon="folder"></v-text-field>
                  <v-text-field outlined label="Nome do cliente" v-model="nomeCliente" prepend-icon="work"></v-text-field>
                  <v-text-field outlined label="Adicionar integrante" v-model="nomeGrupo" prepend-icon="add_box"></v-text-field>
                  <v-textarea outlined label="Descrição do projeto" height="100" v-model="descricao" prepend-icon="edit"></v-textarea>
                  <div class="flex-grow-1"></div>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn depressed outlined dark color="indigo darken-1" @click="dialog = false">Fechar</v-btn>
                      
                      <v-btn depressed outlined dark color="indigo darken-1" class="ml-3 px-4" @click="dialog = false">Criar</v-btn>
                  </v-card-actions>
              </v-form>
            </v-card-text>
        </v-card>
        </v-dialog>
    </div>
</template>


<script>
export default {
    data(){
        return{
            dialog: false,
            nomeGrupo: '',
            nomeProjeto: '',
            nomeCliente: '',
            descricao: '',
        }
    }
}
</script>