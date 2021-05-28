<template>
  <div class="filter-section">
    <select v-model="selectedType" @change="filter($event)">
      <option value="all">All</option>
      <option value="channel">Channels</option>
      <option value="video">Videos</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FilterSection',
  props: ['type'],
  watch: {
    type: {
      immediate: true, 
      handler (val) {
        if(val) {
          this.selectedType = val;
        }
      }
    }
  },
  data() {
    return {
      selectedType: 'all'
    }
  },
  methods: {
    filter(event) {
      this.selectedType = event.target.value;
      this.$emit('filter', this.selectedType);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .filter-section {
    width: 100%;
    padding: 0 0 1rem;
    display: flex;
    justify-content: space-around;
  }
</style>