<template>
  <div id="app">
    <Header></Header>
    <router-view class="content" />
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

    }
  },
  methods: {

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
  }
}
</style>
