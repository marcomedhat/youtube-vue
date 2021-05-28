<template>
  <div class="results">
    <div class="spinner-container mobile" v-if="filteredResults.length == 0">
      <div class="lds-default">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div>
    </div>
    <div class="search-results" v-if="filteredResults.length > 0">
      <FilterSection :type="type" v-on:filter="filter" />
      <div class="search-result" v-bind:key="searchResult.id.videoId" v-for="searchResult in filteredResults">
        <div class="card channel" v-if="searchResult.kind == 'youtube#channel'">
          <div class="card-image">
            <router-link :to="`/channel/${searchResult.id}`">
              <img :src="searchResult.snippet.thumbnails.default.url" :alt="searchResult.snippet.description">
            </router-link>
          </div>
          <div class="card-details">
            <router-link :to="`/channel/${searchResult.id}`">
              <h3>{{searchResult.snippet.title}}</h3>
            </router-link>
            <p>{{searchResult.statistics.videoCount}} Videos</p>
            <p>{{searchResult.statistics.subscriberCount}} Subscribers</p>
          </div>
        </div>
        <div class="card video" v-if="searchResult.kind == 'youtube#video'">
          <div class="card-image">
            <router-link :to="`/video/${searchResult.id}`">
              <img :src="searchResult.snippet.thumbnails.default.url" :alt="searchResult.snippet.description">
            </router-link>
          </div>
          <div class="card-details">
            <router-link :to="`/video/${searchResult.id}`">
              <h3>{{searchResult.snippet.title}}</h3>
            </router-link>
            <router-link :to="`/channel/${searchResult.snippet.channelId}`">
              <p>{{searchResult.snippet.channelTitle}}</p>
            </router-link>
            <p>{{searchResult.statistics.viewCount}} Views</p>
          </div>
        </div>
      </div>

      <div class="load-more">
        <button @click="loadMore" v-if="!loading">Show more items</button>
        <div class="spinner-container" v-if="loading">
          <div class="lds-default">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
    
</template>

<script>
import FilterSection from './Filter.vue'

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
  components: {
    FilterSection
  },
  data() {
    return {
      searchText: this.$route.query.query,
      url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBObo-4LwV58IPz2qzPBHkrlBnYlBCLpog',
      pageToken: '',
      searchResults: [],
      relVideoId: '',
      relChannelId: '',
      loading: false,
      type: 'all',
      filteredResults: []
    }
  },
  created() {
    // this.type = 'all';
    if (this.videoId && this.videoId.length > 0) {
      this.url += `&relatedToVideoId=${this.relVideoId}&type=video`;
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
        if(element.id.videoId) {
          let id = element.id.videoId;
          this.$http.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${id}&key=AIzaSyBObo-4LwV58IPz2qzPBHkrlBnYlBCLpog`)
          .then(data => {
            this.searchResults.push(data.body.items[0]);
            this.filteredResults.push(data.body.items[0]);
            console.log('channel', data.body.items[0]);
          });
        } else if (element.id.channelId) {
          let id = element.id.channelId;
          this.$http.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics%2CbrandingSettings&id=${id}&key=AIzaSyBObo-4LwV58IPz2qzPBHkrlBnYlBCLpog`)
            .then(data => {
              this.searchResults.unshift(data.body.items[0]);
              this.filteredResults.unshift(data.body.items[0]);
              console.log('video', data.body.items[0]);
            });
        }
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
          if(element.id.videoId) {
            let id = element.id.videoId;
            this.$http.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${id}&key=AIzaSyBObo-4LwV58IPz2qzPBHkrlBnYlBCLpog`)
            .then(data => {
              this.searchResults.push(data.body.items[0]);
            });
          } else if (element.id.channelId) {
            let id = element.id.channelId;
            this.$http.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics%2CbrandingSettings&id=${id}&key=AIzaSyBObo-4LwV58IPz2qzPBHkrlBnYlBCLpog`)
              .then(data => {
                this.searchResults.push(data.body.items[0]);
              });
          }
        });
        this.filter('all');
        this.loading = false;
      });
    },
    filter(type) {
      this.type = type;
      if(type == "all") {
        this.filteredResults = [...this.searchResults];
      } else if (type == "channel") {
        this.filteredResults = this.searchResults.filter(element => {
          return element.kind === "youtube#channel";
        });
      } else if (type == "video") {
        this.filteredResults = this.searchResults.filter(element => {
          return element.kind === "youtube#video";
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .search-results {
    padding: 20px 0;
    .search-result {
      margin: 10px 20px;
      .card {
        display: flex;
        a {
          text-decoration: none;
          cursor: pointer;
          h3 {
            color: #000;
          }
        }
        p {
          color: gray;
        }
        .card-details {
          padding-left: 2rem;
        }
        &.channel {
          img {
            border-radius: 50%;
          }
        }
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
      
    }
  }
  .spinner-container {
    margin-left: -42.5px;
    &.mobile {
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
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
  background: gray;
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
@media only screen and (min-width: 768px) {

}
</style>
