<template>
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
            <router-link :to="`/video/${searchResult.id.videoId}`">
                        <img :src="searchResult.snippet.thumbnails.default.url" :alt="searchResult.snippet.description">

            </router-link>
          </div>
          <div class="card-details">
            <h3>{{searchResult.snippet.title}}</h3>
            <p>{{searchResult.snippet.channelTitle}}</p>
          </div>
        </div>
      </div>
      
      <button @click="loadMore">Load More Results</button>
    </div>
</template>

<script>

export default {
  name: 'Home',
  props: ['videoId'],
  watch: {
    videoId: {
      immediate: true, 
      handler (val) {
        this.relVideoId = val;
      }
    }
  },
  data() {
    return {
      searchText: this.$route.query.query,
      url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBObo-4LwV58IPz2qzPBHkrlBnYlBCLpog',
      pageToken: '',
      searchResults: [],
      relVideoId: ''
    }
  },
  created() {
    if (this.videoId && this.videoId.length > 0) {
      this.url += `&relatedToVideoId=${this.relVideoId}&type=video`
    } else if (this.searchText.length > 0) {
      this.url += `&q=${this.searchText}`;
    }
    this.searchResults = [];
    this.$http.get(this.url)
    .then(data => {
      console.log(data);
      this.pageToken = data.body.nextPageToken;
      data.body.items.forEach(element => {
        this.searchResults.push(element);
      });
    });
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .search-results {
    padding: 10px 20px;
    .card {
      display: flex;
    }
  }
</style>
