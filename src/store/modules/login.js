import logImg from '@/assets/img/pexels-002.jpg';
import regImg from '@/assets/img/pexels-007.jpg';
import fogImg from '@/assets/img/pexels-004.jpg';
const state = {
  modes: JSON.parse(sessionStorage.getItem('modes')) == null || 'login' ? 'login' : JSON.parse(sessionStorage.getItem('modes')),
  url: JSON.parse(sessionStorage.getItem('url')) == null || logImg+'' ? logImg : JSON.parse(sessionStorage.getItem('url'))
  // JSON.parse(sessionStorage.getItem('modes')).length >  0
}

const getters = {
  GET_MODES: state => state.modes,
  GET_URL: state => state.url
}

const mutations = {
  SET_MODES: (state, payload) => {
    state.modes = payload + '';
    sessionStorage.setItem('modes', JSON.stringify(state.modes));
  },
  SET_URL: ({ modes }) => {
    // if(state.modes == 'login'){
    //   state.url = logImg
    // }else if(state.modes == 'register'){
    //   state.url = regImg
    // }else{
    //   state.url = fogImg; 
    // }
    console.log(`From store : ${modes}`)
    modes == 'login' ? state.url = logImg :(modes == 'register' ? state.url = regImg : state.url = fogImg);
    sessionStorage.setItem('url', JSON.stringify(state.url));
    console.log(`From store after : ${state.modes} / ${state.url}`)
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