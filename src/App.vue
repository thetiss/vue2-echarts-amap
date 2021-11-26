<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <MigrationMap /> -->
    <IconMap />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import MigrationMap from './components/MigrationMap.vue'
import IconMap from './components/IconMap.vue'
export default {
  name: 'App',
  components: {
    // HelloWorld,
    // MigrationMap,
    IconMap, // 灵活点标记
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
