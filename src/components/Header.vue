<template>
  <div class="header">
    <div class="logo">
      <router-link to="/" exact>
        <img src="..\assets\YouTube-Logo-white.png" alt="Youtube Logo" class="mobile">
        <img src="..\assets\YouTube-Logo.png" alt="Youtube Logo" class="desktop">
      </router-link>
    </div>
  
    <div class="search-field">
      <input type="search" placeholder="Search For Videos" v-model="searchText" v-if="showSearch" class="mobile">
      <input type="search" placeholder="Search For Videos" v-model="searchText" v-if="!searchPage" class="desktop">
      <p v-if="searchPage" class="search-text">{{searchText}}</p>
    </div>

    <div class="search-icon">
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
    if (this.$route.query.query) {
      this.searchText = this.$route.query.query;
      this.searchPage = true;
    }
  },
  methods: {
    searchVideos: function() {
      if (!this.showSearch && !this.searchPage) {
        if (this.searchText.length > 0) {
          this.$router.push({ path: '/search', query: { query: this.searchText }});
          this.searchPage = true;
        } else {
          this.showSearch = true;
        }
      } else if (this.searchPage && !this.showSearch) {
        this.showSearch = true;
        this.searchPage = false;
      } else if (this.showSearch) {
        if (this.searchText.length > 0) {
          this.$router.push({ path: '/search', query: { query: this.searchText }});
          this.searchPage = true;
        }
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
    justify-content: space-between;
    align-items: center;
    background-color: #ff0000;
    padding: 10px;
    -webkit-box-shadow: 0px 3px 7px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 3px 7px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 3px 7px 0px rgba(0,0,0,0.75);
    > div {
      padding: 0 0.3rem;
    }
    .logo {
      max-width: 30%;
      height: 85%;
      img {
        height: 100%;
        &.desktop {
          display: none;
        }
      }
    }
    .search-field {
      min-width: 60%;
      input {
        width: 100%;
        height: 30px;
        border: 1px solid #000;
        border-radius: 5px;
        padding: 0 10px;
        &.desktop {
          display: none;
        }
      }
      .search-text {
        color: #fff;
        text-align: center;
      }
    }
    .search-icon {
      color: #ffffff;
      font-size: 1.2rem;
    }
  }
  @media only screen and (min-width: 768px) {
    .header {
      background-color: #fff;
      height: 80px;
      padding: 0 20px;
      position: fixed;
      width: 100%;
      z-index: 2;
      .logo img {
        &.mobile {
          display: none;
        }
        &.desktop {
          display: block
        }
      }
      .search-field {
        input {
          &.mobile {
            display: none;
          }
          &.desktop {
            display: block
          }
        }
        .search-text {
          font-size: 1.5rem;
          color: #000;
        }
      }
      .search-icon i {
        color: #000;
      }
    }
  }
</style>