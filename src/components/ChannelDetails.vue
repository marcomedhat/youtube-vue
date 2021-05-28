<template>
  <div class="channel">
    <div class="channel-header">
      <div class="channel-images">
        <img :src="channelBanner" class="channel-banner">
        <img :src="channelImage" class="channel-logo">
      </div>
      <div class="channel-details">
        <h2 class="channel-title">{{channelTitle}}</h2>
        <p class="channel-subscribers">{{channelSubscribers}} - Subscribers</p>
      </div> 
    </div>
    <Search :channelId="channelId"></Search> 
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
      channelId: this.$route.params.id,
      channelTitle: '',
      channelImage: '',
      channelBanner: '',
      channelSubscribers: ''
    }
  },
  created() {
    console.log(this.channelId);
    this.$http.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics%2CbrandingSettings&id=${this.channelId}&key=AIzaSyBbAGlJBPcVPgZE_mr2bYHJFmGe9l-egQQ`)
      .then(data => {
        console.log('channel', data);
        this.channelTitle = data.body.items[0].snippet.title;
        this.channelSubscribers = data.body.items[0].statistics.subscriberCount;
        this.channelImage = data.body.items[0].snippet.thumbnails.default.url;
        this.channelBanner = data.body.items[0].brandingSettings.image.bannerImageUrl;
        this.$emit('videoPage', false);
      });
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.channel{
  &-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #e0dede;
  }
  &-images {
    position: relative;
    width: 100%;
  }
  &-banner {
    height: 100px;
    object-fit: cover;
    width: 100%;
  }
  &-logo {
    position: absolute;
    bottom: -40%;
    left: 5%;
    border-radius: 50%;
    transform: scale(0.9);
  }
  &-details {
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1.5rem;
    font-size: 0.7rem;
    width: 60%;
    h2 {
      margin-bottom: 10px;
    }
  }
}
@media only screen and (min-width: 768px) {
  .channel{
    &-banner {
      height: auto;
    }
    &-logo {
      transform: scale(1);
      bottom: -20%;
    }
    &-details {
      font-size: 1rem;
    }
  }
}
</style>