<template>
  <div id="app">
    <Header :openVideo="openVideo"></Header>
    <FilterSection :type="type" v-on:filter="filter" v-if="searchPage()" />
    <router-view class="content" v-on:videoPage="videoPage" :type="type" v-on:filter="filter" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import FilterSection from './components/Filter.vue'

export default {
  name: 'App',
  components: {
    Header,
    FilterSection
  },
  data() {
    return {
      openVideo: false,
      type: ''
    }
  },
  methods: {
    videoPage(val) {
      this.openVideo = val;
    },
    filter(type) {
      this.type = type;
    },
    searchPage() {
      if(this.$route.path == '/search') {
        return true;
      } else {
        return false;
      }
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
</style>
