import Vue from 'vue'
import Vuex from 'vuex';
import main from './modules/main';
import sideBar from './modules/sideBar';
import nav from './modules/nav';
import home from './modules/home';
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    home,
    nav,
    sideBar,
    main
  }
})