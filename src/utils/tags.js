// 路由白名单
const whiteList = ['/login', '/import', '/404', '/401']

/**
 * path是否需要被缓存
 * @param {*} path '' 路由地址
 * @returns Boolean
 */
export function isTags(path) {
  return !whiteList.includes(path)
}
