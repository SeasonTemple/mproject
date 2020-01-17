import Vue from 'vue'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {store} from './store/store';
import axios from 'axios';
// import VueAxios from 'vue-axios';
import qs from 'qs';
import App from './components/base/App.vue'


Vue.use(ElementUi)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.qs = qs
axios.defaults.baseURL=''
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  render: h => h(App)
})
