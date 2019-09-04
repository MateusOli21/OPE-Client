<template>
  <v-container fluid>
    <EscolhaInicialGrupo/>   
  </v-container>
</template>


<script>
import EscolhaInicialGrupo from '@/components/PrimeiroLogin/EscolhaInicialGrupo'

export default {
  name: 'PrimeiroAcesso',
  components:{
    EscolhaInicialGrupo
  }
}
</script>

<style scoped>

</style>