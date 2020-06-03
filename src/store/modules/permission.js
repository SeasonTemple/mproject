import {
  getUserRole
} from "_a/login";
import {
  defaultRouterMap,
  asyncRouterMap
} from "@/router/index";
import {
  getToKen
} from '_u/loginMsg.js';

function hasPermission(roles, router) {
  if (router.meta && router.meta.role) {
    return roles.some(item => router.meta.role.indexOf(item) >= 0)
  }
}

function showMenu(router) {
  router.forEach(item => {
    isExist(item)
    if (item.children && item.children.length > 0) {
      item.children.forEach(child => {
        // console.log(child.name)
        isExist(child)
      })
    }
  })
  console.log(router)
  return router;
}

function isExist(router) {
  let exist = state.menus.find(m => m.url == router.path);
  if (exist) {
    exist.status != 0 ? router.meta.show = true : router.meta.show = false;
    console.log(exist.status != 0 ? "is 1" : "is 0", router.meta.show);
  }
}


const state = {
  allRouters: defaultRouterMap,
  addRouters: [],
  auth: []

}

const getters = {
  allRouters: state => state.allRouters, // 所有的
  addRouters: state => state.addRouters, // 匹配的
  auth: state => state.auth,
  menus: state => state.menus

}

const mutations = { // 必须的  同步 没有回调处理事情
  SET_ROUTER(state, router) {
    state.addRouters = router
    state.allRouters = defaultRouterMap.concat(router)
  },
  SET_AUTH(state, auth) {
    state.auth = auth
  },
  SET_MENUS(state, menus) {
    state.menus = menus
  }
}

const actions = { // 可以回调处理事情 

  getRoles({
    commit
  }, requestData) {
    return new Promise((resolve, reject) => {
      getUserRole(getToKen()).then(response => {
        let data = response.data.data;
        console.log(data)
        commit("SET_AUTH", data.auth)
        commit("SET_MENUS", data.menus)
        resolve(data.roleName);
      }).catch((err) => {
        reject(err)
      })
    })
  },
  /**
   * 创建动态路由
   */
  createRouter({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      // ["infoSystem", "userSystem"]
      let role = data;
      // 超管的状态
      let addRouters = []
      if (role.includes('SUPER')) {
        addRouters = asyncRouterMap
        // console.log(asyncRouterMap)
      } else { // 普通管理员
        console.log("普通管理员")

        // asyncRouterMap.filter(item => {
        //   if (item.meta.show) {
        //     item.children = item.children.filter(child => {
        //       if (child.meta.show) {
        //         return child;
        //       }
        //     })
        //     return item;
        //   }
        // })
        addRouters = asyncRouterMap.filter(item => {
          if (hasPermission(role, item)) {
            // 优先判断 
            if (item.children && item.children.length > 0) {
              item.children = item.children.filter(child => {
                if (hasPermission(role, child)) {
                  return child;
                }
              })
              return item;
            }
            console.log(item)
            return item;
          }
        })
      }
      // 更新路由
      commit('SET_ROUTER', showMenu(addRouters));
      resolve()
    })
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
