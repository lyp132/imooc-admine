/**
 * 判断是否为外部资源
 * @param {*} path
 * @returns 布尔值
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
