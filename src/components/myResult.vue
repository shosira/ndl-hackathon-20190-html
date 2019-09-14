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
import SparqlHttp from 'sparql-http-client'
import fetch from 'isomorphic-fetch'
import card from './card.vue'

SparqlHttp.fetch = fetch
const endpoint = new SparqlHttp({ endpointUrl: "https://jpsearch.go.jp/rdf/sparql/"});

function getItemsByCoords(coords, type) {
  const distance = "5";
  let query = "SELECT ?s ?label ?lat ?long ";
  query += "WHERE {";
  query += " ?s rdfs:label ?label .";
  query += " ?s rdf:type/rdfs:subClassOf* type:標本 .";
  query += ` ?s jps:spatial/schema:geo [
      schema:latitude ?lat;
      schema:longitude ?long
    ] .
    FILTER(?lat < 90)
    FILTER(bif:st_within(
       bif:st_point(?long, ?lat),
       bif:st_point(`;
   query += coords.longitude;
   query += ", ";
   query += coords.latitude;
   query += "), "
   query += distance;
   query += " )) }";

  return endpoint.selectQuery(query)
    .then(res => res.text())
    .then(body => {
      const result = JSON.parse(body);
      return result;
    }).catch(err => console.error(err));
  //return axios
  //  .get(speciesUrl)
  //  .then(function(response) {
  //    return response.data;
  //  })
}

export default {
  name: 'result',
  components: {
    card
  },
  data: function() {
    return {
      typeList: [
        { id: 1, category: "生物", types: ["標本"] },
        { id: 2, category: "工芸・装飾", types: ["コレクション", "工芸", "装飾・工芸", "金工・武器"] }
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
