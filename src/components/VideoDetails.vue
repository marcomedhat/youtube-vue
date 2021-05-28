<template>
  <div class="video">
    <div class="video-container">
       <iframe width="100%" height="270" :src='`//www.youtube.com/embed/${videoId}`' 
       frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
       allowfullscreen></iframe>
    </div>
    <div class="video-details">
      <h3 class="video-title">{{videoTitle}}</h3>
      <h4 class="channel-title">
        <router-link :to="`/channel/${channelId}`">{{channelTitle}}</router-link> - <span>{{views}} Views</span></h4>
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
    this.$http.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${this.videoId}&key=AIzaSyBObo-4LwV58IPz2qzPBHkrlBnYlBCLpog`)
      .then(data => {
        console.log(data);
        this.videoTitle = data.body.items[0].snippet.title;
        this.channelTitle = data.body.items[0].snippet.channelTitle;
        this.channelId = data.body.items[0].snippet.channelId;
        this.views = data.body.items[0].statistics.viewCount;
      });
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.video {
  padding: 2px;
}
  
</style>