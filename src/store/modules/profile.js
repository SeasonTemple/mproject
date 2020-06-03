import {
  MarkAttendance,
  InitAttendance,
  InitInfo,
  InitProjects,
  ModifyProjects,
  InitReport,
  SubmitReport,
  DownloadReport,
  UploadReport,
  SubmitRequest
} from '_a/profile';
import dayjs from "dayjs";
const state = {
  currentTab: "detail",
  attendance: [],
  toDay: {
    time: 0,
    day: dayjs().format("YYYY-MM-DD"),
    first: Date,
    second: Date,
    userId: ""
  },
  informations: [],
  projects: [],
  reports: []
}

const getters = {
  currentTab: state => state.currentTab,
  attendance: state => state.attendance,
  toDay: state => state.toDay,
  informations: state => state.informations,
  projects: state => state.projects,
  reports: state => state.reports
}

const mutations = {
  CHANGE_TAB(state, tabName) {
    state.currentTab = tabName;
  },
  SET_ATTENDANCE(state, value) {
    state.attendance = value
  },
  CHECK_IN(state, value) {
    state.toDay = value;
  },
  SET_INFO(state, value) {
    state.informations = value
  },
  SET_PROJECTS(state, value) {
    Object.assign(state.projects, value)
  },
  SET_REPORTS(state, value) {
    // Object.assign(state.reports, value)
    state.reports = value
  }
}

const actions = {
  INIT_ATTENDANCE({
    commit,
    state
  }, userId) {
    return new Promise((resolve, reject) => {
      InitAttendance(userId).then(res => {
        let code = res.data.code;
        let attendances = res.data.data.attendances;
        if (code == 10200 || code == 10201) {
          if (attendances.length != state.attendance.length) {
            commit("SET_ATTENDANCE", attendances);
          }
          if (attendances.find(a => dayjs().isSame(a.day, "date"))) {
            commit("CHECK_IN", attendances.find(a => dayjs().isSame(a.day, "date")));
          } else {
            commit("CHECK_IN", {
              time: 0,
              day: dayjs().format("YYYY-MM-DD"),
              first: Date,
              second: Date,
              userId: ""
            });
            console.log(state.toDay)
          }
          resolve(res.data.msg);
        }
      }).catch(err => {
        reject(err.msg);
      });
    })
  },
  USER_CHECK_IN({
    commit,
    state
  }, data) {
    // console.log(data);
    if (data.length) {
      commit("CHECK_IN", data);
      state.attendance.push(data);
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
  },
  INIT_PROJECTS({
    commit,
    state
  }, groupId) {
    return new Promise((resolve, reject) => {
      InitProjects(groupId).then(res => {
        let code = res.data.code;
        let data = res.data.data.projects
        if (code == 10200 || code == 10201) {
          if (data.length != state.projects.length) {
            commit("SET_PROJECTS", data)
            resolve(data);
          } else {
            resolve(data);
          }
          console.log(state.projects)
        }
      }).catch(err => {
        reject(err)
      });
    })
  },
  INIT_REPORTS({
    commit,
    state
  }, userName) {
    return new Promise((resolve, reject) => {
      InitReport(userName).then(res => {
        let code = res.data.code;
        let data = res.data.data.reports;
        if (code == 10200 || code == 10201) {
          data.length > 0 ? data.length != state.reports.length ? commit("SET_REPORTS", data) : null : null;
          resolve(data);
        }else{
          reject(res)
        }
      }).catch(err => {
        reject(err);
      });
    })
  },
  SUBMIT_REPORT({
    commit,
    state
  }, report) {
    return new Promise((resolve, reject) => {
      SubmitReport(report).then(res => {
        let code = res.data.code;
        let msg = res.data.msg;
        if (code == 10200 || code == 10201) {
          state.reports.push(report);
          resolve(msg);
        }
      }).catch(err => {
        reject(err)
      });
    })
  },
  DOWNLOAD_REPORTS({
    commit
  }, reports) {
    return new Promise((resolve, reject) => {
      // console.log(typeof reports)
      DownloadReport(reports).then(res => {
        let code = res.status;
        // let data = res.data.data;
        // console.log(res);
        if (code == 200 || code == 201) {
          // console.log(res);
          resolve(res);
        }
      }).catch(err => {
        console.log(err);
        // reject(err);
      });
    })
  },
  UPLOAD_REPORT({
    commit,
    state
  }, report) {
    return new Promise((resolve, reject) => {
      UploadReport(report).then(res => {
        console.log(res)
        resolve();
      }).catch(err => {
        console.log(err)
      });
    })
  },
  SUBMIT_REQUEST({}, request) {
    return new Promise((resolve, reject) => {
      SubmitRequest(request).then(res => {
        let code = res.data.code;
        let msg = res.data.msg;
        if (code == 10200 || code == 10201){
          resolve(msg)
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
