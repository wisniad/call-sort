<template>
  <div id="app">
    <div class="container">
    <table>
      <thead>
      <tr>
        <th><b-btn  class="btn btn-info">Index</b-btn></th>
        <th><b-btn  class="btn btn-info">Imie</b-btn></th>
        <th><b-btn  class="btn btn-info">Nazwisko</b-btn></th>
        <th>
          <b-input-group>
            <b-dropdown text="Dropdown" variant="success" slot="append">
              <b-dropdown-item @click="forwardFilter('')">Wszystkie</b-dropdown-item>
              <b-dropdown-item @click="forwardFilter('yes')">Z przekierowaiem</b-dropdown-item>
              <b-dropdown-item @click="forwardFilter('no')">Brak przekierowania</b-dropdown-item>
            </b-dropdown>
          </b-input-group>
        </th>
        <th @click="sort('number')" ><b-btn  class="btn btn-success sortClick">Number</b-btn></th>
        <th @click="sort('dodano')" ><b-btn  class="btn btn-success sortClick">Dodano</b-btn></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(record, indexRecord) in sortedRecords">
        <td>{{indexRecord+1}}</td>
        <td>{{record.imie}}</td>
        <td>{{record.nazwisko}}</td>
        <td>{{record.forward}}</td>
        <td>{{record.number}}</td>
        <td>{{record.dodano}}</td>
      </tr>
      </tbody>
    </table>

  </div>
  </div>
</template>

<script>

  export default {
    name: 'App',
    components: {},

    data() {
      return {
        records: [],
        currentSort: 'dodano',
        currentSortDir: 'asc',
        forward: ''
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
      },
      forwardFilter:function (s) {
        this.forward = s;
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
        }).filter( a  => {
          if(this.forward === ''){
            return a;
          }
          else {
           return a['forward'] === this.forward;
          }
        })
      }
    }
  }
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';

  td, th {
    padding: 5px;
  }


</style>
