<template>
    <v-menu offset-y open-on-hover>
        <template v-slot:activator="{on}">
            <v-btn fab small text dark slot="activator" v-on="on" @click="drawer = !drawer">
                <v-icon large>account_circle</v-icon>
            </v-btn>
        </template>
                
        <v-card width="300">
                <v-list>
                <v-list-item>
                    <v-avatar size="75" class="grey lighten-2">
                        <v-img src="/avatar-2.png"></v-img>
                    </v-avatar>
                </v-list-item>

                <v-list-item >
                    <v-list-item-content>
                        <v-list-item-title class="title pb-2" >Mateus Oliveira</v-list-item-title>
                    
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on: tooltip }">
                                <v-list-item-subtitle v-on="{ ...tooltip}">mateus.abreu@aluno.faculdadeimpacta.com.br</v-list-item-subtitle>
                            </template>
                            <span>mateus.abreu@aluno.faculdadeimpacta.com.br</span>
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

                <v-list-item link>
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
    
}
</script>