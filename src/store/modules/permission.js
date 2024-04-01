import { privateRouters, publicRouters } from '@/router'

export default {
  namespaced: true,
  state: {
    // 路由表： 初始拥有的公共静态路由权限
    routes: publicRouters
  },
  mutations: {
    /**
     * 设置路由表
     * @param {*} state
     * @param {*} newRoutes [] 筛选之后获取到的需要通过 addRoute 进行添加的路由表数组
     */
    setRoutes(state, newRoutes) {
      // 在静态路由的基础上增加新路由
      state.routes = [...publicRouters, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     * @param {*} context
     * @param {*} menus [] 用户信息中的权限数据
     */
    filterRoutes(context, menus) {
      // 定义筛选之后获取到的需要通过 addRoute 进行添加的路由表数组
      const routes = []
      // 路由权限匹配
      menus.forEach((key) => {
        // 权限名 与 路由的name匹配
        routes.push(...privateRouters.filter((item) => item.name === key))
      })
      // 所有不匹配的路由，全部进入404页面
      // 注意：该配置必须要在所有路由指定之后操作
      // routes.push({
      //   path: '/:catchAll(.*)',
      //   redirect: '/404'
      // })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}
