<template>
  <div id="app">
    <b-container class="bv-example-row text-center">
      <b-row align-h="center">
        <h1 class="paddingContent">Call-sort Vue App</h1>
          <table class="table table-striped">
            <thead class="thead-dark">
            <tr>
              <th >
                <b-btn class="btn btn-info">Index</b-btn>
              </th>
              <th>
                <b-btn class="btn btn-info">Imie</b-btn>
              </th>
              <th>
                <b-btn class="btn btn-info">Nazwisko</b-btn>
              </th>
              <th>
                <b-input-group class="centerCenter">
                  <b-dropdown text="Przekierowania" variant="success" slot="append">
                    <b-dropdown-item @click="forwardFilter('')">Wszystkie</b-dropdown-item>
                    <b-dropdown-item @click="forwardFilter('yes')">Z przekierowaiem</b-dropdown-item>
                    <b-dropdown-item @click="forwardFilter('no')">Brak przekierowania</b-dropdown-item>
                  </b-dropdown>
                </b-input-group>
              </th>
              <th @click="sort('number')">
                <b-btn class="btn btn-success sortClick">Number</b-btn>
              </th>
              <th @click="sort('dodano')">
                <b-btn class="btn btn-success sortClick">Dodano</b-btn>
              </th>
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
      </b-row>
    </b-container>
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
          this.records = res;
        })
    },
    methods: {
      sort: function (s) {
        if (s === this.currentSort) {
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.currentSort = s;
      },
      forwardFilter: function (s) {
        this.forward = s;
      }

    },
    computed: {
      sortedRecords: function () {
        return this.records.sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === 'desc') modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        }).filter(a => {
          if (this.forward === '') {
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

  h1 {
    font-family: 'Roboto', sans-serif;
    font-weight: 800;
    letter-spacing: 2px;
  }
  td, th {
    padding: 5px;
  }

  table {
    border-left: #3f3f3f solid 1px;
    -webkit-box-shadow: 4px 4px 5px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 4px 4px 5px 1px rgba(0,0,0,0.75);
    box-shadow: 4px 4px 5px 1px rgba(0,0,0,0.75);
  }
  .paddingContent {
    padding: 1% 0 1% 0;
  }
  .centerCenter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
