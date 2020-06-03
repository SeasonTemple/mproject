import {
  DeleteInfo,
  AddInfo,
  ModifyInfo,
  InitInfo,
  DeleteRoles,
  AddRole,
  ModifyRole,
  InitRoles
} from "_a/system";
const state = {
  roles: [],
  infoList: []
}

const getters = {
  Get_Roles: state => state.roles,
  Get_InfoList: state => state.infoList,
}

const mutations = {
  SET_Roles(state, value) {
    state.roles = value
  },
  SET_InfoList(state, value) {
    state.infoList = value
  },
}

const actions = {
  INIT_ROLES({
    commit
  }) {
    return new Promise((resolve, reject) => {
      InitRoles().then(res => {
        let code = res.data.code;
        let data = res.data.data;
        if (code == 10200 || code == 10201) {
          commit("SET_Roles", data.roles);
          resolve();
        }
      }).catch(err => {
        reject(err)
      });
    })
  },
  ADD_ROLE({
    commit
  }, role) {
    return new Promise((resolve, reject) => {
      AddRole(role).then(res => {
        console.log(res);
      }).catch(err => {
        reject(err)
      });
    })
  },
  MODIFY_ROLE({
    commit
  }, role) {
    return new Promise((resolve, reject) => {
      ModifyRole(role).then(res => {
        console.log(res);
      }).catch(err => {
        reject(err)
      });
    })
  },
  DELETE_ROLES({
    commit
  }, ids) {
    return new Promise((resolve, reject) => {
      DeleteRoles(ids).then(res => {
        console.log(res);
      }).catch(err => {
        reject(err)
      });
    })
  },
  INIT_INFO({
    commit
  }) {
    return new Promise((resolve, reject) => {
      InitInfo().then(res => {
        let code = res.data.code;
        let data = res.data.data;
        if (code == 10200 || code == 10201) {
          console.log(res);
          // commit("SET_Departments", data.departments);
          // commit("SET_Groups", data.groups);
          commit("SET_InfoList", data.infoList);
          resolve();
        }
      }).catch(err => {
        reject(err)
      });
    })
  },
  ADD_INFO({
    commit,
    state
  }, data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      AddInfo(data).then(res => {
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
  MODIFY_INFO({
    commit,
    state
  }, data) {
    return new Promise((resolve, reject) => {
      ModifyInfo(data).then(res => {
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
  DELETE_INFO({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      DeleteInfo(data).then(res => {
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

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
