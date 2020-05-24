import {
  MarkAttendance,
  InitAttendance,
  InitInfo
} from '_a/profile';
import dayjs from "dayjs";
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
    // console.log(value)
    state.attendance = value
  },
  CHECK_IN(state, value) {
    console.log(state.toDay.length ? 1 : 0)
    state.toDay = value
  },
  SET_INFO(state, value) {
    state.informations = value
  }
}

const actions = {
  INIT_ATTENDANCE({
    commit
  }, userId) {
    return new Promise((resolve, reject) => {
      InitAttendance(userId).then(res => {
        let code = res.data.code;
        let attendances = res.data.data.attendances;
        console.log(attendances.find(a => dayjs().isSame(a.day, "date")));
        if (code == 10200 || code == 10201) {
          commit("SET_ATTENDANCE", attendances);
          commit("CHECK_IN", attendances.find(a => dayjs().isSame(a.day, "date")));
          resolve(res.data.msg);
        }
      }).catch(err => {
        reject(err.msg);
      });
    })
  },
  USER_CHECK_IN({
    commit
  }, data) {
    console.log(data);
    if (data.length) {
      commit("CHECK_IN", data);
      commit("SET_ATTENDANCE", data)
    }
    return new Promise((resolve, reject) => {
      MarkAttendance(data).then(res => {
        let code = res.data.code;
        if (code == 10200 || code == 10201) {
          resolve(res.data.msg)
        } else {
          reject(res.data.msg)
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
