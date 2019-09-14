<template>
  <div id="header">
    <h1>{{ header }}</h1>
      <div class="search-box">
        <button v-on:click="searchByCurrentPosition()">現在地で</button>
        <!-- inputにキーワードをバインド -->
        <input v-model="keyword" />
        <!-- ボタンを押すと検索実行。検索結果はresultに入る -->
        <button>Search</button>
      </div>
    <vue-slider
        v-model="value"
        :absorb="true"
        :marks="marks"
        :included="true"
    ></vue-slider>
  </div>
</template>

<script>

export default {
  name: 'myHeader',
  props: {
    header: String,
  },
  data: function() {
      return {
          keyword: null,
          value: 0,
          marks: [0, 10, 30, 60, 100],
          result: null,
          coords: [0, 0]
      }
  },
  methods: {
    searchByCurrentPosition: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position){
            this.coords = position.coords;
            this.$bus.emit('position-event', this.coords);
          }.bind(this)
        );
      }
    }
  }

}
</script>

<style scoped>
#header {
    background: #f1f1f1;
    padding: 2rem;
}
</style>
