import layout from '@/layout/index'
import store from '@/store'
import { createRouter, createWebHashHistory } from 'vue-router'
import ArticleCreateRoute from './modules/ArticleCreate'
import ArticleRankingRoute from './modules/ArticleRanking'
import PermissionListRoute from './modules/PermissionList'
import RoleListRoute from './modules/RoleList'
import UserManageRoute from './modules/UserManage'

// 私有路由表
export const privateRouters = [
  ArticleCreateRoute,
  ArticleRankingRoute,
  PermissionListRoute,
  RoleListRoute,
  UserManageRoute
]
// console.log(privateRouters)

// 公开路由表
export const publicRouters = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  // 登录页面
  {
    path: '/login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/login')
  },
  // 首页
  {
    path: '/',
    // 重定向
    redirect: '/profile',
    component: layout,
    children: [
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-User'
        }
      },
      // 404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      // 401
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/views/error-page/404')
  }
]

export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((item) => {
      router.removeRoute(item)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRouters
})

export default router
