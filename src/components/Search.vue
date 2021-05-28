<template>
    <div class="search-results">
      <div class="search-result" v-bind:key="searchResult.id.videoId" v-for="searchResult in searchResults">
        <div class="card channel" v-if="searchResult.id.kind == 'youtube#channel'">
          <div class="card-image">
            <router-link :to="`/channel/${searchResult.id.channelId}`">
              <img :src="searchResult.snippet.thumbnails.default.url" :alt="searchResult.snippet.description">
            </router-link>
          </div>
          <div class="card-details">
            <router-link :to="`/channel/${searchResult.id.channelId}`">
              <h3>{{searchResult.snippet.title}}</h3>
            </router-link>
          </div>
        </div>
        <div class="card video" v-if="searchResult.id.kind == 'youtube#video'">
          <div class="card-image">
            <router-link :to="`/video/${searchResult.id.videoId}`">
              <img :src="searchResult.snippet.thumbnails.default.url" :alt="searchResult.snippet.description">
            </router-link>
          </div>
          <div class="card-details">
            <router-link :to="`/video/${searchResult.id.videoId}`">
              <h3>{{searchResult.snippet.title}}</h3>
            </router-link>
            <router-link :to="`/channel/${searchResult.snippet.channelId}`">
              <p>{{searchResult.snippet.channelTitle}}</p>
            </router-link>
          </div>
        </div>
      </div>

      <div class="load-more">
        <!-- <button @click="loadMore" v-if="!loading">Load More Results</button> -->
        <div class="spinner-container">
          <div class="lds-default">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div>
        </div>
      </div>
      
    </div>
</template>

<script>

export default {
  name: 'Home',
  props: ['videoId', 'channelId'],
  watch: {
    videoId: {
      immediate: true, 
      handler (val) {
        this.relVideoId = val;
      }
    },
    channelId: {
      immediate: true, 
      handler (val) {
        this.relChannelId = val;
      }
    },
    '$route' (to, from) {
      if(from.query.query && to.query.query){ 
        this.$router.go()
        }    
    }
  },
  data() {
    return {
      searchText: this.$route.query.query,
      url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBObo-4LwV58IPz2qzPBHkrlBnYlBCLpog',
      pageToken: '',
      searchResults: [],
      relVideoId: '',
      relChannelId: '',
      loading: false
    }
  },
  created() {
    if (this.videoId && this.videoId.length > 0) {
      this.url += `&relatedToVideoId=${this.relVideoId}&type=video`
    } else if (this.channelId && this.channelId.length > 0) {
      this.url += `&channelId=${this.channelId}`;
    } else if (this.searchText && this.searchText.length > 0) {
      this.url += `&q=${this.searchText}`;
    }
    this.searchResults = [];
    this.$http.get(this.url)
    .then(data => {
      console.log('data', data);
      this.pageToken = data.body.nextPageToken;
      data.body.items.forEach(element => {
        let id = element.id.videoId;
        this.$http.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${id}&key=AIzaSyBObo-4LwV58IPz2qzPBHkrlBnYlBCLpog`)
          .then(data => {
            console.log('video-data', data);
            this.searchResults.push(data.body.items[0]);
            console.log(this.searchResults);
          });
      });
    });
  },
  methods: {
    loadMore: function() {
      this.loading = true;
      this.url += `&pageToken=${this.pageToken}`;
      this.$http.get(this.url)
      .then(data => {
        this.pageToken = data.body.nextPageToken;
        data.body.items.forEach(element => {
          this.searchResults.push(element);
        });
        this.loading = false;
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .search-results {
    .search-result {
      padding: 10px 20px;
      .card {
        display: flex;
      }
    }
    .load-more {
      width: 100%;
      display: flex;
      justify-content: center;
      button {
        width: 100%;
        height: 50px;
        border: none;
        border-top: 1px solid #000;
        background-color: #fff;
        color: #000;
      }
      .spinner-container {
        margin-left: -42.5px;
      }
    }
  }
.lds-default {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
}
.lds-default div {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #000;
  border-radius: 50%;
  animation: lds-default 1.2s linear infinite;
}
.lds-default div:nth-child(1) {
  animation-delay: 0s;
  top: 37px;
  left: 66px;
}
.lds-default div:nth-child(2) {
  animation-delay: -0.1s;
  top: 22px;
  left: 62px;
}
.lds-default div:nth-child(3) {
  animation-delay: -0.2s;
  top: 11px;
  left: 52px;
}
.lds-default div:nth-child(4) {
  animation-delay: -0.3s;
  top: 7px;
  left: 37px;
}
.lds-default div:nth-child(5) {
  animation-delay: -0.4s;
  top: 11px;
  left: 22px;
}
.lds-default div:nth-child(6) {
  animation-delay: -0.5s;
  top: 22px;
  left: 11px;
}
.lds-default div:nth-child(7) {
  animation-delay: -0.6s;
  top: 37px;
  left: 7px;
}
.lds-default div:nth-child(8) {
  animation-delay: -0.7s;
  top: 52px;
  left: 11px;
}
.lds-default div:nth-child(9) {
  animation-delay: -0.8s;
  top: 62px;
  left: 22px;
}
.lds-default div:nth-child(10) {
  animation-delay: -0.9s;
  top: 66px;
  left: 37px;
}
.lds-default div:nth-child(11) {
  animation-delay: -1s;
  top: 62px;
  left: 52px;
}
.lds-default div:nth-child(12) {
  animation-delay: -1.1s;
  top: 52px;
  left: 62px;
}
@keyframes lds-default {
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>
