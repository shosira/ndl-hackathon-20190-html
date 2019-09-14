<template>
    <!--div id="result">
        <div class="listbox" v-for="category in categories" :key="category.name">
            <h3>{{ category.name}}</h3>
            <ul>
                <li class="card" v-for="record in records" :key="record.name">
                    <h3>{{ record.name }}</h3>
                    <p>説明文</p>
                </li>
            </ul>
        </div>
    </div-->
    <div id="result" v-if="result">
        <div class="listbox">
            <h3>生物</h3>
            <ul>
                <li class="card" v-for="record in result.results.bindings">
                    <h3>{{ record.label.value }}</h3>
                    <p>{{ record.lat.value}}, {{ record.long.value }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import card from './card.vue'

const queryPre = "https://jpsearch.go.jp/rdf/sparql/?default-graph-uri=&query="
const speciesQuery = "SELECT+%3Fs+%3Flabel+%3Flat+%3Flong+WHERE+%7B%0D%0A++++%3Fs+rdf%3Atype%2Frdfs%3AsubClassOf*+type%3A%E6%A8%99%E6%9C%AC+%3B%0D%0A++++++++rdfs%3Alabel+%3Flabel++.%0D%0A++++%3Fs+jps%3Aspatial%2Fschema%3Ageo+%5B%0D%0A++++++++schema%3Alatitude+%3Flat%3B%0D%0A++++++++schema%3Alongitude+%3Flong%0D%0A++++%5D+.%0D%0A++++FILTER%28%3Flat+%3C+90%29%0D%0A++++FILTER%28bif%3Ast_within%28%0D%0A++++++++bif%3Ast_point%28%3Flong%2C+%3Flat%29%2C++%0D%0A++++++++bif%3Ast_point%28139.907700%2C+35.729130%29%2C+%0D%0A++++++++10+++++++++++++%0D%0A++++%29%29%0D%0A%7D&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on&run=+Run+Query+";

function getItemsByCoords(coords) {
  /*const speciesUrl = queryPre + "SELECT+%3Fs+%3Flabel+%3Flat+%3Flong+WHERE+%7B%0D%0A++++%3Fs+rdf%3Atype%2Frdfs%3AsubClassOf*+type%3A%E6%A8%99%E6%9C%AC+%3B%0D%0A++++++++rdfs%3Alabel+%3Flabel++.%0D%0A++++%3Fs+jps%3Aspatial%2Fschema%3Ageo+%5B%0D%0A++++++++schema%3Alatitude+%3Flat%3B%0D%0A++++++++schema%3Alongitude+%3Flong%0D%0A++++%5D+.%0D%0A++++FILTER%28%3Flat+%3C+90%29%0D%0A++++FILTER%28bif%3Ast_within%28%0D%0A++++++++bif%3Ast_point%28%3Flong%2C+%3Flat%29%2C++%0D%0A++++++++bif%3Ast_point%28"
    longitude +
    "%2C" +
    latitude +
    "%29%2C+%0D%0A++++++++10+++++++++++++%0D%0A++++%29%29%0D%0A%7D&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on&run=+Run+Query+"*/
  const speciesUrl = queryPre + speciesQuery
  return axios
    .get(speciesUrl)
    .then(function(response) {
      return response.data;
    })
}

export default {
  name: 'result',
  components: {
    card
  },
  data: function() {
    return {
      categories: [
           { name: '文化'},
           { name: '刀剣'},
           { name: '書画'}
      ],
      records: [
         { name: '山田', age: '34歳' },
         { name: '田中', age: '45歳' }
      ],
      result: null,
      coords: [0, 0]
    }
  },
  computed: {
    limitCount() {
      return this.records.slice(0,4);
    }
  },
  mounted: function(){
    this.$bus.on('position-event', function(coords) {
      this.coords = coords;
      getItemsByCoords(coords).then(function(result) {
        this.result = result;
      }.bind(this));
    }.bind(this));
  },
}
</script>

<style>
#result {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
div.listbox {
    min-width: 20rem;
}
ul {
    list-style: none;
    margin: 0;
    padding-left: 0;
}
ul li.card {
    background: #fff;
    border-radius: 0.5rem;
    padding: 0.25rem;
    overflow: hidden;
    margin-bottom: 0.5rem;
}
</style>
