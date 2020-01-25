import Vue from 'vue'
import Router from 'vue-router'
import NProgress from '../utils/NProgress'
Vue.use(Router)

//路由白名单
const whiteRouters = ['/', '/login', '/404']

//默认路由表(面向所有用户)
const defaultRouterMap = [{
    path: '/',
    name: '无条件跳转',
    redirect: '/index'
  },
  // {
  //   path: '/login',
  //   name: '登录',
  //   component: '',
  //   meta: {
  //     title: 'login'
  //   }
  // },
  {
    path: '/index',
    name: '主页',
    component: () => import('@/components/base/Layout'),
    meta: {
      title: 'index'
    }
  }
]

//异步路由表(根据登录用户权限动态生成)
export const asyncRouterMap = []

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0
  }),
  routes: defaultRouterMap
})

router.beforeEach((to, from, next) => {
  NProgress.set(0.2)
  next()
})

router.afterEach(() => {
  NProgress.done()
})