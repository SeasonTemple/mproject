import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

import sideBar from './modules/sideBar';

export const store = new Vuex.Store({
  modules: {
    sideBar
  }
})