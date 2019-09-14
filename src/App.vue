<template>
  <div id="app">
    <myHeader header="Local Search"></myHeader>
    <img alt="Vue logo" src="./assets/logo.png">
  </div>
</template>

<script>
import myHeader from './components/myHeader.vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    myHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
