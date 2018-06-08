// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './AppVue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';


Vue.use(BootstrapVue);

Vue.config.productionTip = false;


import AppVue from './AppVue';

/* eslint-disable no-new */
new Vue({
  el:'#app',
  components: {AppVue},
  template: '<AppVue/>'
})


