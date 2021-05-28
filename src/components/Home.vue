<template>
  <div class="home">
    <Header v-on:searchVideos="searchVideos($event)"></Header>
    <div class="search-results">
      <div class="search-result" v-bind:key="searchResult.id.videoId" v-for="searchResult in searchResults">
        <div class="card channel" v-if="searchResult.id.kind == 'youtube#channel'">
          <div class="card-image">
            <img :src="searchResult.snippet.thumbnails.default.url" :alt="searchResult.snippet.description">
          </div>
          <div class="card-details">
            <h3>{{searchResult.snippet.title}}</h3>
            <p>{{searchResult.snippet.channelTitle}}</p>
          </div>
        </div>
        <div class="card video" v-if="searchResult.id.kind == 'youtube#video'">
          <div class="card-image">
            <img :src="searchResult.snippet.thumbnails.default.url" :alt="searchResult.snippet.description">
          </div>
          <div class="card-details">
            <h3>{{searchResult.snippet.title}}</h3>
            <p>{{searchResult.snippet.channelTitle}}</p>
          </div>
        </div>
      </div>
      
      <button @click="loadMore">Load More Results</button>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'

export default {
  name: 'Home',
  data() {
    return {
      searchText: '',
      url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBbAGlJBPcVPgZE_mr2bYHJFmGe9l-egQQ',
      pageToken: '',
      searchResults: []
    }
  },
  components: {
    Header
  },
  created() {
  },
  methods: {
    loadMore: function() {
      this.url += `&pageToken=${this.pageToken}`;
      this.$http.get(this.url)
      .then(data => {
        this.pageToken = data.body.nextPageToken;
        data.body.items.forEach(element => {
          this.searchResults.push(element);
        });
      });
    },
    searchVideos: function(searchText) {
      this.searchText = searchText;
      this.url += `&q=${this.searchText}`;
      this.searchResults = [];
      this.$http.get(this.url)
      .then(data => {
        console.log(data);
        this.pageToken = data.body.nextPageToken;
        data.body.items.forEach(element => {
          this.searchResults.push(element);
        });
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home {
    width: 100%;
    .search-results {
      padding: 10px 20px;
      .card {
        display: flex;
      }
    }
    
  }
</style>
