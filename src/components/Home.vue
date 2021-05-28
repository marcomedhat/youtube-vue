<template>
  <div class="home">
    <h1>Welcome to Youtube Clone</h1>
    <p>Search for videos you like...</p>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      
    }
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    h1 {
      font-size: 1.5rem;
      line-height: 2;
      margin-bottom: 1rem;
    }
  }
  @media only screen and (min-width: 768px) {
    .home {
      h1 {
        font-size: 2rem;
      }
    }
  }
</style>
