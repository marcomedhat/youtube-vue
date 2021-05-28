<template>
  <div class="header">
    <div class="logo">
      <img src="..\assets\YouTube-Logo-white.png" alt="Youtube Logo">
    </div>
  
    <div class="search-field">
      <input type="text" placeholder="Search For Videos" v-model="searchText">
    </div>

    <div class="serch-icon">
      <i class="fas fa-search" @click="searchVideos"></i>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      searchText: ''
    }
  },
  created() {

  },
  methods: {
    searchVideos: function() {
      this.$emit('searchVideos', this.searchText)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header {
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #ff0000;
    > div {
      padding: 0 0.3rem;
    }
    .logo {
      max-width: 30%;
      img {
        width: 80%;
      }
    }
  }
</style>