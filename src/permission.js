import router from './router/index.js'
import store from './store/index.js'
import { isCheckTimeout } from './utils/auth.js'
// 路由守卫
// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 * @param {*} to 即将要进入的目标
 * @param {*} from 当前导航正要离开的路由
 * @param {*} next 是否要跳转路由
 */
router.beforeEach(async (to, from, next) => {
  // 1.存在token时，用户已登录，则不允许进入 login
  if (store.getters.token) {
    // 判断 token 是否超时
    if (isCheckTimeout()) {
      // token 超时则进行退出登录动作
      store.dispatch('user/logout')
      return Promise.reject(new Error('token 失效'))
    }

    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户信息是否存在，
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action, 并获取当前用户的权限
        const { permission } = await store.dispatch('user/getUserInfo')
        // 触发根据权限筛选路由的action，并获取到需要使用addroute添加的权限
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 利用 addRoute 循环添加路由
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要进行一次主动跳转
        next(to.path)
      } else {
        next()
      }
    }
  } else {
    // 2.没有token 的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
