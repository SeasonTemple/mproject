import {
  getUserName
} from "_u/loginMsg.js";
import {
  InitUserData
} from "_a/main.js";
const state = {
  openedTab: ['home'],
  activeTab: 'home',
  userDetail: {}
}

const getters = {
  OPENEDTAB: state => state.openedTab,
  ACTIVETAB: state => state.activeTab,
  USERDETAIL: state => state.userDetail
}

const mutations = {
  addTab(state, componentName) {
    if (state.openedTab.indexOf(componentName) == -1) {
      state.openedTab.push(componentName)
    }
  },
  changeTab(state, componentName) {
    state.activeTab = componentName
  },
  deductTab(state, componentName) {
    let index = state.openedTab.indexOf(componentName)
    state.openedTab.splice(index, 1)
  },
  SET_USERDETAIL(state, data) {
    state.userDetail = data;
  }
}

const actions = {
  GET_UserDetail({
    commit
  }) {
    return new Promise((resolve, reject) => {
      if (getUserName() != "" || getUserName() != null) {
        InitUserData({
            userName: getUserName()
          })
          .then(res => {
            let status = res.data.code;
            let data = res.data.data;
            if (status == 10200 || status == 10201) {
              commit("SET_USERDETAIL", data)
              resolve(data)
            } else {
              reject(data.msg)
            }
          })
          .catch(err => {
            reject(err)
          });
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
