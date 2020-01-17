const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
}

const getters = {
    isCollapse: state => state.isCollapse
}

const mutations = {
    SET_COLLAPSE(state) {
        console.log(state.isCollapse)
        state.isCollapse = !state.isCollapse
        //html5 本地缓存
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
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