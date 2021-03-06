import {
  InitUserList,
  AddUser,
  ModifyUser,
  DeleteUsers,
  InitDuty,
  AddDuty,
  ModifyDuty,
  DeleteDuty,
  InitRequest,
  HandleRequest,
  InitSalary,
  ModifySalary,
} from "_a/hr";
const state = {
  tableData: [],
  departments: [],
  groups: [],
  projects: [],
  requests: [],
  salaryList: []
}

const getters = {
  Get_TableData: state => state.tableData,
  Get_Departments: state => state.departments,
  Get_Groups: state => state.groups,
  Get_Projects: state => state.projects,
  Get_Requests: state => state.requests,
  Get_SalaryList: state => state.salaryList,
}

const mutations = {
  SET_TableData(state, value) {
    state.tableData = value
  },
  SET_Departments(state, value) {
    state.departments = value
  },
  SET_Groups(state, value) {
    state.groups = value
  },
  SET_Projects(state, value) {
    state.projects = value
  },
  SET_Requests(state, value) {
    state.requests = value
  },
  SET_SalaryList(state, value) {
    state.salaryList = value
  },
}

const actions = {
  INIT_TableData({
    commit
  }) {
    return new Promise((resolve, reject) => {
      InitUserList().then(res => {
        let code = res.data.code;
        let data = res.data.data;
        if (code == 10200 || code == 10201) {
          console.log(res);
          commit("SET_TableData", data.tableData);
          commit("SET_Departments", data.departments);
          commit("SET_Groups", data.groups);
          commit("SET_Projects", data.projects);
          resolve();
        }
      }).catch(err => {
        reject(err)
      });
    })
  },
  ADD_TableData({
    commit
  }, user) {
    return new Promise((resolve, reject) => {
      AddUser(user).then(res => {
        console.log(res);
      }).catch(err => {
        reject(err)
      });
    })
  },
  MODIFY_TableData({
    commit
  }, userDetail) {
    return new Promise((resolve, reject) => {
      ModifyUser(userDetail).then(res => {
        console.log(res);
      }).catch(err => {
        reject(err)
      });
    })
  },
  DELETE_TableData({
    commit
  }, ids) {
    return new Promise((resolve, reject) => {
      DeleteUsers(ids).then(res => {
        console.log(res);
      }).catch(err => {
        reject(err)
      });
    })
  },
  INIT_DUTY({
    commit
  }) {
    return new Promise((resolve, reject) => {
      InitDuty().then(res => {
        let code = res.data.code;
        let data = res.data.data;
        if (code == 10200 || code == 10201) {
          console.log(res);
          commit("SET_Departments", data.departments);
          commit("SET_Groups", data.groups);
          commit("SET_Projects", data.projects);
          resolve();
        }
      }).catch(err => {
        reject(err)
      });
    })
  },
  ADD_DUTY({
    commit,
    state
  }, data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      AddDuty(data).then(res => {
        console.log(res)
        let code = res.data.code;
        let msg = res.data.msg;
        let flag = data.flag;
        let change = data.change;
        if (code == 10200 || code == 10201) {
          let k = 0;
          switch (flag) {
            case 1:
              k = state.departments.findIndex(d => d.id == change.id);
              state.departments.splice(k, 1, change);
              break;
            case 2:
              k = state.groups.findIndex(g => g.id == change.id);
              state.groups.splice(k, 1, change);
              break;
            case 3:
              k = state.projects.findIndex(p => p.id == change.id);
              state.projects.splice(k, 1, change);
              break;
          }
          resolve(msg);
        }
      }).catch(err => {
        reject(err)
      });
    })
  },
  MODIFY_DUTY({
    commit,
    state
  }, data) {
    return new Promise((resolve, reject) => {
      ModifyDuty(data).then(res => {
        console.log(res)
        let code = res.data.code;
        let msg = res.data.msg;
        let flag = data.flag;
        let change = data.change;
        if (code == 10200 || code == 10201) {
          let k = 0;
          switch (flag) {
            case 1:
              k = state.departments.findIndex(d => d.id == change.id);
              state.departments.splice(k, 1, change);
              break;
            case 2:
              k = state.groups.findIndex(g => g.id == change.id);
              state.groups.splice(k, 1, change);
              break;
            case 3:
              k = state.projects.findIndex(p => p.id == change.id);
              state.projects.splice(k, 1, change);
              break;
          }
          resolve(msg);
        }
      }).catch(err => {
        reject(err)
      });
    })
  },
  DELETE_DUTY({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      DeleteDuty(data).then(res => {
        console.log(res)
        // let code = res.data.code;
        // let data = res.data.data;
        // if (code == 10200 || code == 10201) {
        //   console.log(res);
        //   commit("SET_Departments", data.departments);
        //   commit("SET_Groups", data.groups);
        //   commit("SET_Projects", data.projects);
        resolve();
        // }
      }).catch(err => {
        reject(err)
      });
    })
  },
  INIT_REQUEST({
    commit
  }) {
    return new Promise((resolve, reject) => {
      InitRequest().then(res => {
        let code = res.data.code;
        let data = res.data.data;
        if (code == 10200 || code == 10201) {
          console.log(res);


          commit("SET_Requests", data.requests);
          resolve();
        }
      }).catch(err => {
        reject(err)
      });
    })
  },
  HANDLE_REQUEST({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      HandleRequest(data).then(res => {
        let code = res.data.code;
        let data = res.data.data;
        if (code == 10200 || code == 10201) {
          console.log(res);
          // commit("SET_Requests", data.requests);
          resolve(res.data.data.msg);
        }
      }).catch(err => {
        reject(err)
      });
    })
  },
  INIT_SALARY({
    commit
  }) {
    return new Promise((resolve, reject) => {
      InitSalary().then(res => {
        let code = res.data.code;
        let data = res.data.data;
        if (code == 10200 || code == 10201) {
          console.log(res);
          commit("SET_SalaryList", data.attendances);
          resolve();
        }
      }).catch(err => {
        reject(err)
      });
    })
  },
  MODIFY_SALARY({
    commit
  }) {
    return new Promise((resolve, reject) => {
      ModifySalary().then(res => {
        let code = res.data.code;
        let data = res.data.data;
        if (code == 10200 || code == 10201) {
          console.log(res);
          commit("SET_Requests", data.requests);
          resolve();
        }
      }).catch(err => {
        reject(err)
      });
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
