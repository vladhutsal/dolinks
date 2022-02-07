<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <p v-dolinks="kek" style="white-space: break-spaces;"></p>
    <textarea v-model="kek"></textarea>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      something: 'New text https://google.com',
      // kek: 'https://www.sendinblue.com/features/chat/',
      kek: 'https://google.com/s'
    }
  }
});
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
