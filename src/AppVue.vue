<template>
  <div id="app">

    <table>
      <thead>
      <tr>
        <th @click="sort('imie')">Imie</th>
        <th @click="sort('nazwisko')">Nazwisko</th>
        <th @click="sort('forward')">Przekierowanie</th>
        <th @click="sort('number')">Numer</th>
        <th @click="sort('dodano')">Dodano</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="record in sortedRecords">
        <td>{{record.imie}}</td>
        <td>{{record.nazwisko}}</td>
        <td>{{record.forward}}</td>
        <td>{{record.number}}</td>
        <td>{{record.dodano}}</td>
      </tr>
      </tbody>
    </table>


  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},

    data() {
      return {
        records: [],
        currentSort: 'imie',
        currentSortDir: 'asc'
      }
    },
    created: function () {
      fetch('http://esense2.voicetel.pl:20005/getResults/?firstName=voicetel&lastName=test')
        .then(res => res.json())
        .then(res => {
          // console.log(res)
          this.records = res;
        })
    },
    methods:{
      sort:function(s) {
        //if s == current sort, reverse
        if(s === this.currentSort) {
          this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
        }
        this.currentSort = s;
      }

    },
    computed:{
      sortedRecords:function() {
        return this.records.sort((a,b) => {
          let modifier = 1;
          if(this.currentSortDir === 'desc') modifier = -1;
          if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        })
      }
    }
  }
</script>

<style>
  td, th {
    padding: 5px;
  }

  th {
    cursor:pointer;
  }
</style>
