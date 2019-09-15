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
    <div id="result">
        <div class="listbox" v-for="category in categories" :key="category.name">
            <h3>{{ category.name }}</h3>
            <ul>
                <li class="card" v-for="record in results.results.bindings">
                    <h3>{{ record.label.value }}</h3>
                    <p>{{ record.image }}</p>
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
  let query = "SELECT ?s ?label ?lat ?long ?image ?type\n";
  query += "WHERE {\n";
  query += "  ?s rdfs:label ?label.\n";
  query += "  VALUES ?type { "
  type.types.forEach((value, i, array) => {
    query += "type:" + value;
    if (i < array.length - 1) {
      query += " ";
    }
  });
  query += "  }\n";
  query += "  ?s rdf:type/rdfs:subClassOf* ?type .\n" ;
  query += "  OPTIONAL { ?s schema:image ?image . } \n"
  query += `  ?s jps:spatial/schema:geo [
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
   query += "  )\n)\n }";

  return endpoint.selectQuery(query)
    .then(res => res.text())
    .then(body => {
      const result = JSON.parse(body);
      return result;
    }).catch(err => console.error(err));
}

export default {
  name: 'result',
  components: {
    card
  },
  data: function() {
    return {
      categories: [
        { id: "cat1", name: "生物", types: ["標本"], result: []},
        { id: "cat2", name: "工芸・装飾", types: ["コレクション", "工芸", "装飾・工芸", "金工・武器"], result: []}
      ],
      results: [],
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
      this.categories.forEach((name, types, result) => {
        getItemsByCoords(this.coords, name).then(function(res) {
          this.results = res;
        }.bind(this))
      });
    }.bind(this));
  },
}
</script>

<style lang="scss" scoped>
#result {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
div.listbox {
    min-width: 20rem;
    ul {
        list-style: none;
        margin: 0;
        padding-left: 0;
        li.card {
            background: #fff;
            border-radius: 0.5rem;
            padding: 0.25rem;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }
    }
}
</style>
