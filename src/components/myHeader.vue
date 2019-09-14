<template>
  <div id="header">
    <h1>{{ header }}</h1>
      <div class="search-box">
        <button>現在地で</button>
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
    header: String
  },
  data: function() {
      return {
          value: 0,
          marks: [0, 10, 30, 60, 100]
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