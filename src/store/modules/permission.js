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
const state = {
  allRouters: defaultRouterMap,
  addRouters: [],

}

const getters = {
  allRouters: state => state.allRouters, // 所有的
  addRouters: state => state.addRouters, // 匹配的

}

const mutations = { // 必须的  同步 没有回调处理事情
  SET_ROUTER(state, router) {
    state.addRouters = router
    state.allRouters = defaultRouterMap.concat(router)
  }
}

const actions = { // 可以回调处理事情 
  /**
   * 获取用户角色 
   * @param {*} param0
   * @param {*} requestData 
   */
  getRoles({
    commit
  }, requestData) {
    return new Promise((resolve, reject) => {
      getUserRole(getToKen()).then(response => {
        let data = response.data.data;
        console.log(response.data)
        resolve(data);
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
      if (role.includes('ADMIN')) {
        addRouters = asyncRouterMap
        // console.log(asyncRouterMap)
      } else { // 普通管理员
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
      commit('SET_ROUTER', addRouters);
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
