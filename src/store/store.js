import Vue from 'vue'
import Vuex from 'vuex';
import main from './modules/main';
import sideBar from './modules/sideBar';
import nav from './modules/nav';
import home from './modules/home';
import login from './modules/login';
Vue.use(Vuex);
const state = {
  permissions: []
}

const getters = {

}

const mutations = {
  // SET_MODE: (state, data) => {
  //   state.mode = data
  // },
  // SET_PERMISSION: (state, data) => {
  //   state.permissions = data
  // }
}

const actions = {
  // SET_MODE({
  //   commit
  // }, payload) {

  // },
  GET_PERMISSION({
    commit
  }) {
    return new Promise((resolve, reject) => {

    })
  }
}

export const store = new Vuex.Store({
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    home,
    nav,
    sideBar,
    main,
    login
  }
})