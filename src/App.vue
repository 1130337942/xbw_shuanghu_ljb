<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  created(){
    // this.$store.dispatch('getArea',{})
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height:100%;
}
* {
  padding: 0;
  margin: 0;
}
html,body {
  height: 100%;
  width: 100%;
}
@import url('./assets/css/common.less');
</style>
