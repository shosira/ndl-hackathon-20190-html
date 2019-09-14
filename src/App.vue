<template>
  <div id="app">
    <myHeader header="Local Search"></myHeader>
    <myMap></myMap>
    <myResult></myResult>
  </div>
</template>

<script>
import myHeader from './components/myHeader.vue'
import myMap from './components/myMap.vue'
import myResult from './components/myResult.vue'

export default {
  name: 'app',
  components: {
    myHeader,
    myMap,
    myResult
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background: #f7f7f7;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;

}
</style>
