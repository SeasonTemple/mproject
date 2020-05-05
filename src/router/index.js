import Vue from 'vue'
import Router from 'vue-router'
import NProgress from '_u/NProgress'
import '@/assets/css/nprogress.css'
// import Nav from '@/components/navs/Nav'
// import SideBar from '@/components/sidebars/Sidebar'
// import Main from '@/components/default/Main'
import Home from "@/components/default/contents/Home"
import {
  Message
} from 'element-ui'
import {
  store
} from "../store/store";
import {
  getToKen,
  removeToKen,
  removeUserName
} from '_u/loginMsg.js';
Vue.use(Router)

//路由白名单
export const whiteRouter = ['/', '/login']

//默认路由表(面向所有用户)
export const defaultRouterMap = [{
    path: '/',
    name: 'Base',
    redirect: '/login',
    meta: {
      title: '无条件跳转'
    },
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('@/components/login/Login')
  },
  {
    path: '/index',
    component: () => import('@/components/base/Layout'),
    children: [{
      path: '',
      name: 'Index',
      components: {
        Nav: () => import('@/components/navs/Nav'),
        SideBar: () => import('@/components/sidebars/Sidebar'),
        Main: () => import('@/components/default/Main')
      }
    }],
  }
]

//异步路由表(根据登录用户权限动态生成)
export const asyncRouterMap = [
  // {
  //   path: "/main",
  //   name: "Main",
  //   alias: '/index/main',
  //   component: () => import("@/components/default/Main"),
  //   children: [
  // {
  {
    path: "/center",
    name: "Center",
    meta: {
      role: ['USER', 'CUSTOM', 'ADMIN'],
      keepAlive: false,
      title: "个人中心",
      icon: "el-icon-user-solid"
    },
    component: () => import("@/components/default/contents/Profile"),
    children: [{
      path: "detail",
      name: "Detail",
      meta: {
        role: ['USER', 'CUSTOM', 'ADMIN'],
        keepAlive: true,
        title: "用户详情",
      },
      component: () => import("@/components/default/contents/profiles/Detail")
    }, {
      path: "report",
      name: "Report",
      meta: {
        role: ['USER', 'CUSTOM', 'ADMIN'],
        keepAlive: true,
        title: "工作报告",
      },
      component: () => import("@/components/default/contents/profiles/Report")
    }, {
      path: "process",
      name: "Process",
      meta: {
        role: ['USER', 'CUSTOM', 'ADMIN'],
        keepAlive: true,
        title: "项目进展",
      },
      component: () => import("@/components/default/contents/profiles/Process")
    }, {
      path: "information",
      name: "Information",
      meta: {
        role: ['USER', 'CUSTOM', 'ADMIN'],
        keepAlive: true,
        title: "系统消息",
      },
      component: () => import("@/components/default/contents/profiles/Information")
    }, {
      path: "request",
      name: "Request",
      meta: {
        role: ['USER', 'CUSTOM', 'ADMIN'],
        keepAlive: true,
        title: "事务申请",
      },
      component: () => import("@/components/default/contents/profiles/Request")
    },
    {
      path: "analyze",
      name: "Analyze",
      meta: {
        role: ['USER', 'CUSTOM', 'ADMIN'],
        keepAlive: true,
        title: "签到考勤",
      },
      component: () => import("@/components/default/contents/profiles/Request")
    }
  ]
  },
  {
    path: "/hr",
    name: "Hr",
    meta: {
      role: ['ADMIN'],
      keepAlive: false,
      title: "人事管理",
      icon: "el-icon-eleme"
    },
    children: [{
        path: "staff",
        name: "Staff",
        meta: {
          role: ['ADMIN'],
          keepAlive: true,
          title: "职工管理",
        },
        component: () => import("@/components/default/contents/hr/Staff"),
      },
      {
        path: "department",
        name: "Department",
        meta: {
          role: ['ADMIN'],
          keepAlive: true,
          title: "职能管理",
        },
        component: () => import("@/components/default/contents/hr/Department"),
      },
      {
        path: "requestMg",
        name: "RequestMg",
        meta: {
          role: ['ADMIN'],
          keepAlive: true,
          title: "申请管理",
        },
        component: () => import("@/components/default/contents/hr/RequestMg"),
      },
      {
        path: "salaryMg",
        name: "SalaryMg",
        meta: {
          role: ['ADMIN'],
          keepAlive: true,
          title: "薪资管理",
        },
        component: () => import("@/components/default/contents/hr/SalaryMg"),
      }
    ]
  },
  {
    path: "/system",
    name: "System",
    meta: {
      role: ['ADMIN'],
      keepAlive: false,
      title: "系统管理",
      icon: "el-icon-setting"
    },
    children: [{
        path: "account",
        name: "Account",
        meta: {
          role: ['ADMIN'],
          keepAlive: true,
          title: "角色管理",
        },
        component: () => import("@/components/default/contents/system/Account"),
      },
      {
        path: "infoMg",
        name: "InfoMg",
        meta: {
          role: ['ADMIN'],
          keepAlive: true,
          title: "通知管理",
        },
        component: () => import("@/components/default/contents/system/InfoMg"),
      },
      // {
      //   path: "systemLog",
      //   name: "SystemLog",
      //   meta: {
      //     role: ['ADMIN'],
      //     keepAlive: true,
      //     title: "系统日志",
      //   },
      //   component: () => import("@/components/default/contents/system/SystemLog"),
      // },
    ]
  },
  {
    path: "/faq",
    name: "Faq",
    meta: {
      role: ['USER', 'CUSTOM', 'ADMIN'],
      keepAlive: true,
      title: "使用帮助",
      icon: "el-icon-question"
    },
    children: [{
        path: "document",
        name: "Document",
        meta: {
          role: ['USER', 'CUSTOM', 'ADMIN'],
          keepAlive: true,
          title: "说明文档",
        },
        component: () => import("@/components/default/contents/faq/Document"),
      },
      {
        path: "guide",
        name: "Guide",
        meta: {
          role: ['USER', 'CUSTOM', 'ADMIN'],
          keepAlive: true,
          title: "操作向导",
        },
        component: () => import("@/components/default/contents/faq/Guide"),
      },
    ]
  }
]

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
  if (getToKen()) {
    if (to.path === '/login') {
      store.dispatch("login/EXIT");
      console.log("beforeEach/dispatch")
      // removeToKen();
      // removeUserName();
      // store.state.commit("login/SET_TOKEN", '');
      // store.state.commit("login/SET_USERNAME", '');
      setTimeout(() => next(), 1000);
    } else {
      console.log("ssss")
      // 获取用户的色
      // 动态分配路由权限
      /**
       * 1、什么时候处理动态路由
       * 2、以什么条件处理
       * roles[]
       */
      if (store.getters['login/roles'].length === 0) {
        store.dispatch('permission/getRoles').then(response => {
          console.log(response)
          // let button = response.button; 
          // let btnPerm = response.btnPerm;
          store.commit("login/SET_ROLES", response);
          // store.commit("login/SET_BUTTON", btnPerm);
          // 存储角色 
          store.dispatch('permission/createRouter', [response]).then(response => {
            let addRouters = store.getters['permission/addRouters'];
            let allRouters = store.getters['permission/allRouters'];
            // 路由更新
            router.options.routes = allRouters;
            // 添加动态路由
            router.addRoutes(addRouters)
            console.log(allRouters)
            console.log(addRouters)
            next({
              ...to,
              replace: true
            });
            // es6扩展运算符，防止内容发生变化的情况
            // 不被记录历史记录
          })
        }).catch((err) => {
          console.log("123123")
          if (err != null || err != "") {
            Message.error({
              message: "登录超时，请重新登录！",
              offset: 230,
              duration: 2000
            })
          } else {
            Message.error({
              message: err.data.data.msg,
              offset: 230,
              duration: 2000
            })
          }
          setTimeout(() => next('/login'), 1000); // 路由指向
        });
      } else {
        setTimeout(() => next(), 1000);
      }
    }
    // 路由动态添加，分配菜单，每个角色分配不同的菜单
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) { // 存在
      setTimeout(() => next(), 1000);
    } else {
      Message.error({
        message: "无权访问：请先进行登录！",
        offset: 230,
        duration: 2000
      })
      setTimeout(() => next('/login'), 800); // 路由指向
    }
    /**
     * 1、直接进入index的时候，参数to被改变成了 "/index"，触发路由指向，就会跑beforeEach
     * 2、再一次 next 指向了login，再次发生路由指向，再跑beforeEach，参数的to被改变成了"/login"
     * 3、白名单判断存在，则直接执行next()，因为没有参数，所以不会再次beforeEach。
     */
  }
})

router.afterEach(() => {
  NProgress.done()
})
