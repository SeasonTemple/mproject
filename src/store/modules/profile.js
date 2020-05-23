import {
  MarkAttendance,
  InitInfo
} from '_a/profile'
const state = {
  currentTab: "detail",
  attendance: [],
  toDay: {},
  informations: []
}

const getters = {
  currentTab: state => state.currentTab,
  attendance: state => state.attendance,
  toDay: state => state.toDay,
  informations: state => state.informations
}

const mutations = {
  CHANGE_TAB(state, tabName) {
    state.currentTab = tabName;
  },
  SET_ATTENDANCE(state, value) {
    console.log(value)
    state.attendance = value
  },
  CHECK_IN(state, value) {
    state.toDay = value
  },
  SET_INFO(state, value) {
    state.informations = value
  }
}

const actions = {
  USER_CHECK_IN({
    commit,
    data
  }) {
    return new Promise((resolve, reject) => {
      MarkAttendance(data).then(res => {
        let code = res.data.code;
        if (code == 10200 || code == 10201) {
          resolve(res.data.data.msg)
        } else {
          reject(res.data.data.msg)
        }
      }).catch(err => {
        reject(err)
      });
    })
  },
  INIT_INFORMATION({
    commit
  }, userName) {
    return new Promise((resolve, reject) => {
      InitInfo(userName).then(res => {
        console.log(res)
        let code = res.data.code;
        let data = res.data.data.informations;
        if (code == 10200 || code == 10201) {
          commit("SET_INFO", data)
          resolve(data)
        } else {
          reject(res.msg)
        }
      }).catch(err => {
        reject(err)
      });
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
