const state = {
  currentTab: "detail"
}

const getters = {
  currentTab: state => state.currentTab,
}

const mutations = {
  CHANGE_TAB(state, tabName) {
    state.currentTab = tabName;
    // console.log('2' + tabName, state.currentTab)
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
