<template>
    <div id="result">
        <div class="listbox" v-for="category in categories" :key="category.name">
            <h3>{{ category.name}}</h3>
            <ul>
                <li class="card" v-for="record in records" :key="record.name">
                    <h3>{{ record.name }}</h3>
                    <p>説明文</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import card from './card.vue'
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
　　　　]
　　　}
　　},
　　computed: {
　　　limitCount() {
　　　　return this.records.slice(0,4)
　　　}
　　}
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