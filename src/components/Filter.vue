<template>
  <div class="filter-section">
    <div class="filter-section-mobile">
      <select v-model="selectedType" @change="filter($event)">
        <option value="all">All</option>
        <option value="channel">Channels</option>
        <option value="video">Videos</option>
      </select>
    </div>

    <div class="filter-section-desktop">
      <div class="filter-section-icon" @click="openFilters">
        <i class="fas fa-bars"></i> <span>Filters</span>
      </div>
      <div class="filter-section-form" v-if="filterOpen">
        <div class="input-field"  v-bind:class="{ active: (this.selectedType === 'all') }">
          <label>
            <input type="radio" name="type" v-model="selectedType" value="all" @change="filter($event)"> All 
          </label>
          <span @click="deselect">X</span>
        </div>
        <div class="input-field" v-bind:class="{ active: (this.selectedType === 'channel') }">
          <label>
            <input type="radio" name="type" v-model="selectedType" value="channel" @change="filter($event)"> Channels 
          </label>
          <span @click="deselect">X</span>
        </div>
        <div class="input-field" v-bind:class="{ active: (this.selectedType === 'video') }">
          <label >
            <input type="radio" name="type" v-model="selectedType" value="video" @change="filter($event)"> Videos 
          </label>
          <span @click="deselect">X</span>
        </div>
      </div>
    </div>
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
      selectedType: 'all',
      filterOpen: false
    }
  },
  methods: {
    filter(event) {
      this.selectedType = event.target.value;
      this.$emit('filter', this.selectedType);
    },
    deselect() {
      this.selectedType = 'all'
      this.$emit('filter', 'all');
    },
    openFilters() {
      this.filterOpen = !this.filterOpen;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .filter-section {
    width: 100%;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #c4c4c4;
    &-desktop {
      display: none;
    }
    &-icon {
      cursor: pointer;
      position: absolute;
      right: 10%;
    }
    &-form {
      margin-top: 50px;
    }
  }
  @media only screen and (min-width: 768px) {
    .filter-section {
      padding-top: 100px;
      padding-bottom: 30px;
      &-mobile {
        display: none;
      }
      &-desktop {
        display: flex;
        flex-direction: column;
        .input-field {
          display: flex;
          label{
            input {
              display: none;
            }
          }
          span {
            margin-left: 25px;
            display: none;
            cursor: pointer;
          }
          &.active span {
            display: inline-block;
          }
        }
        
      }
    }
  }
</style>