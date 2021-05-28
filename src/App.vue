<template>
  <div id="app">
    <Header :openVideo="openVideo"></Header>
    <router-view class="content" v-on:videoPage="videoPage" />
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      openVideo: false
    }
  },
  methods: {
    videoPage(val) {
      console.log('app-val', val);
      this.openVideo = val;
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
  font-family: sans-serif;
}
@media only screen and (min-width: 768px) {
  .content {
    padding-top: 80px;
    /* width: 90%;
    margin: 0 auto; */
  }
}
</style>
