import path from 'path-browserify'
/**
 * 获取所有路由的子集路由
 * @param {*} allrouter [] 所有路由记录
 * @returns [] 过滤后的所有子集路由
 */
const getChildrenRouters = (allrouter) => {
  const result = []
  allrouter.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由：某个一级路由为其他路由的子路由，则剔除该一级路由
 * @param {*} allrouter [] 所有路由记录
 * @returns [] 过滤后的所有包含子集的路由表
 */
export const filterRouters = (allrouter) => {
  // 获取所有路由的子集路由
  const childrenRouters = getChildrenRouters(allrouter)
  // 根据子集路由进行查重操作过滤数组
  return allrouter.filter((route) => {
    // 如果return值为真，则保留该成员。如果return值为假，则剔除该成员
    return !childrenRouters.find((childrenRoute) => {
      // 如果return值为真，则返回该成员。如果return值为假，则返回undefined
      return childrenRoute.path === route.path
    })
  })
}
/**
 * 判断数据是否为空值
 * @param {*} data alltype 传递的参数
 * @returns Boolean
 */
function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}
/**
 * 根据过滤掉重复路由后的数据( filterroutes 数据)，返回对应 menu 规则数组
 * 方法本质为构建了一个：递归
 * @param {*} routers [] 需要解析的路由表
 * @param {*} basePath string 解析过程中需要处理的基础路径
 * @returns [] 返回一个数组，该数组会在 SidebarMenu 中被 v-for 循环用于 sidebar-item 的渲染
 */
export const generateMenus = (routers, basePath = '') => {
  // 最终需要返回的值
  const result = []
  // console.log(routers)
  // 遍历路由表：不满足该条件 `meta && meta.title && meta.icon` 的数据不应该存在
  routers.forEach((item) => {
    // 不存在children && 不存在meta 则被认为是 《不需要处理的数据》 直接return
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在children && 不存在meta 则被认为是《父节点》，需要进行解析，所以进入迭代
    if (!isNull(item.children) && isNull(item.meta)) {
      result.push(...generateMenus(item.children))
      // return
    }

    // 存在meta
    // 最终的menu需要进行跳转，此时需要合并path作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由（指的是：name 相同的路由对象）的情况，需要单独处理
    // 很多同学比较关注同名父路由，这个其实不需要过于关心的。因为同名的 name 本身就是不符合约定的。
    let route = result.find((item) => item.path === routePath)
    // 查找匹配的 route 对象，如果 route 对象不存在，则表示当前的 route 还没有放入到 result 数组中，所以我们需要构建一个新的 route 对象，并且把它放入到 result 里面
    if (!route) {
      // result 中不存在同名路由
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 与 title 必须全部存在，只有这样，我们才认为它是一个需要在 《menu item》 中展示的数据
      if (route.meta.icon && route.meta.title) {
        // 将新生成的路由放入result 中
        result.push(route)
      }
    }

    // 存在children，存在meta。进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  // console.log(result)

  return result
}
