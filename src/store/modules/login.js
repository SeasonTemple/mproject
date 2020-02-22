const state = {
  mode: 'login' ? 'login' : JSON.parse(sessionStorage.getItem('mode')) ,
}

const getters = {
  mode: state => state.mode
}

const mutations = {
  SET_MODE: (state,payload)=> {
    state.mode = payload+'';
    sessionStorage.setItem('mode', JSON.stringify(state.mode));
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}