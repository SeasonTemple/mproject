import logImg from '@/assets/img/pexels-002.jpg';
import regImg from '@/assets/img/pexels-007.jpg';
import fogImg from '@/assets/img/pexels-004.jpg';
import {
  setToKen,
  removeToKen,
  removeUserName,
  setUserName,
  getToKen
} from '_u/loginMsg.js';
import {
  UserLogin,
  UserNameLogin,
  SSO
} from "_a/login.js";
const state = {
  roles: [],
  to_ken: '',
  // username: getUserName() || '',
  modes: JSON.parse(sessionStorage.getItem('modes')) == null || 'login' ? 'login' : JSON.parse(sessionStorage.getItem('modes')),
  url: JSON.parse(sessionStorage.getItem('url')) == null || logImg + '' ? logImg : JSON.parse(sessionStorage.getItem('url'))
  // JSON.parse(sessionStorage.getItem('modes')).length >  0
}

const getters = {
  GET_MODES: state => state.modes,
  GET_URL: state => state.url,
  roles: state => state.roles,
}

const mutations = {
  SET_MODES: (state, payload) => {
    state.modes = payload + '';
    sessionStorage.setItem('modes', JSON.stringify(state.modes));
  },
  SET_URL: ({
    modes
  }) => {
    // if(state.modes == 'login'){
    //   state.url = logImg
    // }else if(state.modes == 'register'){
    //   state.url = regImg
    // }else{
    //   state.url = fogImg; 
    // }
    console.log(`From store : ${modes}`)
    modes == 'login' ? state.url = logImg : (modes == 'register' ? state.url = regImg : state.url = fogImg);
    sessionStorage.setItem('url', JSON.stringify(state.url));
    // console.log(`From store after : ${state.modes} / ${state.url}`)
  },
  SET_TOKEN(state, value) {
    state.to_ken = value
  },
  SET_USERNAME(state, value) {
    state.username = value
  },
  SET_ROLES(state, value) {
    state.roles = value;
  },
  SET_BUTTON(state, value) {
    state.buttonPermission = value;
  }
}

const actions = {
  LOGIN({
    commit
  }, requestData) {
    return new Promise((resolve, reject) => {
      UserLogin(requestData).then((res) => {
        let data = res.data.data
        let status = res.data.code;
        let token = res.headers.authorization;
        if (status == 10201 || status == 10200) {
          commit('SET_TOKEN', token);
          commit('SET_USERNAME', data.userName);
          setToKen(token);
          setUserName(data.userName);
          resolve(data.userName)
        } else {
          reject(res.data.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  EXIT({
    commit
  }) {
    return new Promise((resolve, reject) => {
      removeToKen();
      removeUserName();
      commit('SET_TOKEN', '');
      commit('SET_USERNAME', '');
      commit('SET_ROLES', []);
      resolve();
    })

  },
  AUTOLOGIN({
    commit
  }) {
    return new Promise((resolve, reject) => {
      let token = getToKen();
      console.log(this.state.to_ken, getToKen())
      if (token != "" && token != null) {
        SSO(token).then((res) => {
          let data = res.data.data
          let status = res.data.code;
          let token = res.headers.authorization;
          if (status == 10201 || status == 10200) {
            commit('SET_TOKEN', token);
            commit('SET_USERNAME', data.userName);
            setToKen(token);
            setUserName(data.userName);
            resolve(data.userName)
          } else {
            reject(res.data.msg)
          }
        }).catch(error => {
          reject(error)
        })
      }
    })
  },
  USERNAMELOGIN({
    commit
  }, requestData) {
    return new Promise((resolve, reject) => {
      UserNameLogin(requestData).then((res) => {
        console.log(res)
        let data = res.data.data
        let status = res.data.code;
        let token = res.headers.authorization;
        if (status == 10201 || status == 10200) {
          commit('SET_TOKEN', token);
          commit('SET_USERNAME', data.userName);
          setToKen(token);
          setUserName(data.userName);
          resolve(data.userName)
        } else {
          reject(res.data.msg)
        }
      }).catch(error => {
        reject(error)
      })
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
