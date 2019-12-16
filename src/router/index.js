import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    components: {
      top: () => import('@/components/base/Nav'),
      left: () => import('@/components/base/Sidebar'),
      default: () => import('@/components/base/Main.vue'),
    }
  }]
})