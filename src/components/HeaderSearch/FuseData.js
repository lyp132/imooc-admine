import i18n from '@/i18n'
import path from 'path-browserify'
/**
 * 筛选出可供fuse搜索的路由表
 * @param {*} routes [] 所有包含子集路由的路由表
 * @param {*} basePath string 基础路径，默认为 /
 * @param {*} profixTitle [] title中的数据
 * @returns [] 期望得到的检索数据源
 */
export const generateRoutes = (routes, basePath = '/', profixTitle = []) => {
  // 创建 result 数据
  let res = []
  // 循环 routes 路由
  routes.forEach((route) => {
    // 创建包含 path 和 title 的 item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...profixTitle]
    }
    // 匹配动态路由的正则
    const re = /.*\/:.*/
    // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
    // 动态路由不允许被搜索
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18ntitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18ntitle]
      res.push(data)
    }

    // 存在children 时， 进行迭代
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  })
  return res
}
