import {
  InitEcharts
} from "_a/profile";
const state = {
  initData: []
}

const getters = {
  Get_initData: state => state.initData
}

const mutations = {
  SET_InitData(state, value) {
    state.initData = value;
  }
}

const actions = {
  INIT_ECHARTS({
    commit
  }, userDetail) {
    return new Promise((resolve, reject) => {
      InitEcharts(userDetail).then((res) => {
        commit("SET_InitData", res.data.data);
      }).catch((err) => {
        console.log(err)
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
