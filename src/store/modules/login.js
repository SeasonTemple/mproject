const state = {
  modes: (String === typeof(JSON.parse(sessionStorage.getItem('modes'))) || JSON.parse(sessionStorage.getItem('modes'))!= null) ? JSON.parse(sessionStorage.getItem('modes')): 'login'

}

const getters = {
  modes: state => state.modes
}

const mutations = {
  SET_MODES: (state, payload) => {
    state.modes = payload;
    sessionStorage.setItem('modes', JSON.stringify(state.modes));
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