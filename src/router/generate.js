export const generate = (permission, asyncRouters) => {
  return new Promise((resolve, reject) => {
    const routers = [];
    //创建路由,递归获取用户的权限表
    function createRouters(permission) {
      permission.forEach((p) => {
        if (p.children && p.children.length) {
          createRouters(p.children)
        }
        let path = p.path
        //迭代异步路由表进行权限匹配,将符合权限的路由集加入routers[]中
        asyncRouters.find((t) => {
          if (t.path === '') {
            t.children.find((y) => {
              if (y.path === path) {
                y.meta.permission = p.permission
                routers.push(t)
              }
            })
          }
          if (t.path === path) {
            t.meta.permission = p.permission
            routers.push(t)
          }
        })
      });
    }
    createRouters(permission)
    resolve([routers])
  })
}