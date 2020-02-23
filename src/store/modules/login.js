import logImg from '@/assets/img/pexels-002.jpg';
import regImg from '@/assets/img/pexels-004.jpg';
import fogImg from '@/assets/img/pexels-005.jpg';
const state = {
  modes: JSON.parse(sessionStorage.getItem('modes')) == null || '' ? 'login' : JSON.parse(sessionStorage.getItem('modes')),
  url: JSON.parse(sessionStorage.getItem('url')) == null || '' ? logImg : JSON.parse(sessionStorage.getItem('url'))
  // JSON.parse(sessionStorage.getItem('modes')).length >  0
}

const getters = {
  GET_MODES: state => state.modes,
  GET_URL: state => state.url
}

const mutations = {
  SET_MODES: (state, payload) => {
    state.modes = payload + '';
    console.log(payload)
    sessionStorage.setItem('modes', JSON.stringify(state.modes));
  },
  SET_URL: (state,payload) => {
    if(state.modes == 'login'){
      state.url = logImg
    }if(state.modes == 'register'){
      state.url = regImg
    }else{
      state.url = fogImg; 
      // state.modes == 'register' ? state.url = regImg : 
    }
    console.log(state.url,payload)
    sessionStorage.setItem('url', JSON.stringify(state.url));
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