<template>
    <v-app>
      <template v-if=" !['home'].includes($route.name)">
       <Navbar/> 
      </template>
        <v-content>
            <router-view></router-view>
        </v-content>
        <Footer/>
    </v-app>
</template>

<script>

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Profile from '@/services/profile.js';
import { Promise } from 'q';


export default {
  name: 'App',
  components:{
    Navbar,
    Footer
  },
  
}
</script>

<style>

</style>
