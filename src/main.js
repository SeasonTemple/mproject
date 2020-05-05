import Vue from 'vue'
import { router } from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { store } from './store/store'
import axios from './utils/axios';
import owl from '_a/api'
import cookie from 'js-cookie'
// import VueAxios from 'vue-axios';
import echarts from 'echarts'
import NProgress from './utils/NProgress'
import 'nprogress/nprogress.css'
import qs from 'qs'
import App from './components/base/App.vue'
import { wow } from '_u/wow_config.js'
// import wow from 'wowjs'
import 'animate.css'
import fontAwesome from 'font-awesome/css/font-awesome.min.css'
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
process.env.NODE_ENV === "production" && Sentry.init({
  dsn: 'https://f12751ceccea42a3a4d7f661152c9e47@o388119.ingest.sentry.io/5224487',
  integrations: [new Integrations.Vue({Vue, attachProps: true})],
  release: 'test@1.0.0',
  logErrors: true
});

Vue.use(ElementUi)
Vue.config.productionTip = false
Vue.prototype.echarts = echarts
// Vue.prototype.axios = axios
Vue.prototype.cookie = cookie
Vue.prototype.NProgress = NProgress
Vue.prototype.qs = qs
Vue.prototype.wow = wow
owl()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})