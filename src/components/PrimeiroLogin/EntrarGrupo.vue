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
                    <v-text-field outlined label="Código" v-model="codigo" prepend-icon="lock"></v-text-field>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed outlined dark color="indigo darken-1" class="mx-0 mt-3 mr-3 px-4" @click="dialog = false">Fechar</v-btn>
                        <v-btn depressed outlined dark color="indigo darken-1" class="mx-0 mt-3" @click="dialog = false">Participar</v-btn>
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
            dialog:false,
            codigo: ''
        }
    }
}
</script>