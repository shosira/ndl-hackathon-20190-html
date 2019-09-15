<template>
  <div id="header">
    <h1><img src="../assets/logo.svg"></h1>
      <div class="search-box">
        <button v-on:click="searchByCurrentPosition()">現在地を取得</button>
        <!-- inputにキーワードをバインド -->
        <!-- ボタンを押すと検索実行。検索結果はresultに入る -->
        <vue-slider
            v-model="value"
            :absorb="true"
            :marks="marks"
            :included="true"
        ></vue-slider>
        <button>Search</button>
      </div>
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
        value: 10,
        marks: [10, 30, 60, 100],
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

<style lang="scss" scoped>
#header {
  padding: 2rem;
  h1 {
    img {
      max-height: 6rem;
    }
  }
}
button {
  background: #b0a31c;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem;
  color: #fff;
  margin: 0.5rem;
}
</style>
