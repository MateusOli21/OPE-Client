<template>
<div class="landing-page">
  <v-container class="fill-height">
    <HomeLogin/>
  </v-container>
  </div>
</template>

<script>
import HomeLogin from '@/components/Home/HomeLogin'

export default {
  name: 'home',
  components: {
    HomeLogin
  }
}
</script>

<style scoped>

.landing-page {
    background-color: #EEEEEE;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }


</style>
