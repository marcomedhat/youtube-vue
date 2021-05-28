<template>
  <div class="header">
    <div class="logo">
      <router-link to="/" exact>
        <img src="..\assets\YouTube-Logo-white.png" alt="Youtube Logo">
      </router-link>
    </div>
  
    <div class="search-field">
      <input type="text" placeholder="Search For Videos" v-model="searchText" v-if="showSearch">
      <p v-else-if="searchPage">{{searchText}}</p>
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
      searchText: '',
      searchPage: false,
      showSearch: false
    }
  },
  created() {

  },
  methods: {
    searchVideos: function() {
      if (!this.showSearch) {
        this.showSearch = true;
        this.searchPage = false;
      } else if (this.showSearch) {
        this.$router.push({ path: '/search', query: { query: this.searchText }});  
        this.searchPage = true;
        this.showSearch = false;
      }
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