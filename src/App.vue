<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import './assets/css/global.css'
export default {
  name: 'app',
  created () {
    this.$http.get(
      '/setting'
    ).then(result => {
      
      window.sessionStorage.setItem('title', result.data.title)
      window.sessionStorage.setItem('bg', result.data.bg)
    })
  }
}
</script>

<style lang="css" scoped>

</style>
