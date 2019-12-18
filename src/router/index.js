import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    components: {
      top: () => import('@/components/navs/Nav'),
      left: () => import('@/components/sidebars/Sidebar'),
      default: () => import('@/components/contents/Main.vue'),
    }
  }]
})