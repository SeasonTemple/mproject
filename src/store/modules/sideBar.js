const state = {
  isCollapse: true,
  switchBar: !JSON.parse(sessionStorage.getItem('isCollapse')) ? '展开菜单' : '收起菜单'
}

const getters = {
  isCollapse: state => state.isCollapse,
  switchBar: state => state.switchBar
}

const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse
    state.switchBar = state.isCollapse ? '展开菜单' : '收起菜单'
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