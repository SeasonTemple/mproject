const state = {
  openedTab: ['home'],
  activeTab: 'home',
}

const getters = {
  OPENEDTAB: state => state.openedTab,
  ACTIVETAB: state => state.activeTab,
}

const mutations = {
  addTab(state, componentName) {
    if(state.openedTab.indexOf(componentName)==-1){
      state.openedTab.push(componentName)
    }
  },
  changeTab(state, componentName) {
    state.activeTab = componentName
  },
  deductTab(state, componentName) {
    let index = state.openedTab.indexOf(componentName)
    state.openedTab.splice(index, 1)
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
