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
import axios from 'axios'

function getCurrentPosition(options){
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

function getItemsByPosition(latitude, longitude) {
  const url = "https://jpsearch.go.jp/rdf/sparql?default-graph-uri=&query=SELECT+%3Fs+%3Flabel+%3Flat+%3Flong+WHERE+%7B%0D%0A++++%3Fs+jps%3Aspatial%2Fschema%3Ageo+%5B%0D%0A++++++++schema%3Alatitude+%3Flat%3B%0D%0A++++++++schema%3Alongitude+%3Flong%0D%0A++++%5D+.%0D%0A++++FILTER%28%3Flat+%3C+90%29%0D%0A++++FILTER%28bif%3Ast_within%28%0D%0A++++++++bif%3Ast_point%28%3Flong%2C+%3Flat%29%2C++%0D%0A++++++++bif%3Ast_point%28" +
    longitude +
    "%2C+" +
    latitude +
    "%29%2C+%0D%0A++++++++1+%0D%0A++++%29%29%0D%0A++++%3Fs+a+%3Ftype+%3B%0D%0A++++++++rdfs%3Alabel+%3Flabel++.%0D%0A%7D&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on&run=+Run+Query+";
  console.log(url);
  return axios
    .get(url)
    .then(function(response) {
      return response.data;
    })
}

async function searchItemsByCurrentPosition(){
  try {
    let position = await getCurrentPosition();
    console.log(position.coords.latitude, position.coords.longitude);
    return getItemsByPosition(position.coords.latitude, position.coords.longitude);
  }
  catch(error){
    console.log(error);
  }
}

export default {
  name: 'myHeader',
  props: {
    header: String
  },
  data: function() {
      return {
          value: 0,
          marks: [0, 10, 30, 60, 100],
          result: null
      }
  },
  methods: {
    searchByCurrentPosition: function() {
      var _this = this;
      searchItemsByCurrentPosition().then(function(data) {
        _this.result = data;
      });
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
