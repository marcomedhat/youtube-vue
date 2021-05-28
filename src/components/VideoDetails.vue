<template>
  <div class="video">
    <div class="video-container">
       <iframe width="100%" height="270" :src='`//www.youtube.com/embed/${videoId}`' 
       frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
       allowfullscreen></iframe>
    </div>
    <div class="video-details">
      <h3 class="video-title">{{videoTitle}}</h3>
      <p class="channel-title">
        <router-link :to="`/channel/${channelId}`">{{channelTitle}}</router-link> - <span>{{views}} Views</span>
      </p>
    </div>
    <Search :videoId="videoId"></Search> 
  </div>
</template>

<script>
import Search from './Search.vue'

export default {
  name: 'VideoDetails',
  components: {
    Search
  },
  watch: {
    '$route' (to, from) {
      if(from.params.id && to.params.id){ 
        this.$router.go()
        }    
    }
  },
  data() {
    return {
      videoId: this.$route.params.id,
      videoTitle: '',
      channelTitle: '',
      channelId: '',
      views: ''
    }
  },
  created() {
    console.log(this.videoId);
    this.$http.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${this.videoId}&key=AIzaSyBbAGlJBPcVPgZE_mr2bYHJFmGe9l-egQQ`)
      .then(data => {
        console.log(data);
        this.videoTitle = data.body.items[0].snippet.title;
        this.channelTitle = data.body.items[0].snippet.channelTitle;
        this.channelId = data.body.items[0].snippet.channelId;
        this.views = data.body.items[0].statistics.viewCount;
        this.$emit('videoPage', true);
      });
    
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.video {
  
  &-details {
    padding: 10px;
    font-size: 0.8rem;
    h3 {
      color: #000;
      margin-bottom: 10px;
    }
    a {
      text-decoration: none;
      cursor: pointer;
      color: gray;
      margin-bottom: 5px;
    }
    p {
      color: gray;
    }
  }
}

@media only screen and (min-width: 768px) {
  .video {
    &-container,
    &-details {
      width: 90%;
      margin: 15px auto 0;
    }
    &-container {
      iframe {
        height: 450px;
      }
    }
    &-details {
      font-size: 1rem;
      h3 {
        margin-bottom: 10px;
      } 
    }
  }
}
  
</style>