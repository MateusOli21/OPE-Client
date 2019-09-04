<template>
     <nav>
        <v-toolbar color="indigo darken-1" >
            <v-toolbar-title class="text-uppercase white--text">
                <router-link class="links" to="/">
                    <v-img src="https://www.impacta.edu.br/themes/wc_agenciar3/images/logo-new.png" height="50" width="200"></v-img>
                </router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- menu dropdown-->
            <MenuNavbar/>    

            <!-- icone para abrir navegação lateral
            <v-btn fab small text dark @click="drawer = !drawer">
                <v-icon large>account_circle</v-icon>
            </v-btn>
            -->
            

        </v-toolbar>

        <!-- navegação lateral 
        <v-navigation-drawer app right temporary v-model="drawer">
                <h1>abcd</h1>
        </v-navigation-drawer>
        --> 
            
     </nav>
</template>

<script>

import MenuNavbar from '@/components/MenuNavbar';


export default {
    name: 'Navbar',
    components:{
        MenuNavbar
    },
    data(){
        return{
            drawer: false,
        }
    }
}
</script>

<style scoped>

.links{
    color: white;
    text-decoration: none;
}
</style>

