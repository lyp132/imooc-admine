import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
// 鉴权：用户被动退出解决方案之主动处理
/**
 * 设置时间戳
 */
export function setTimeStamp() {
  // 在本地存储中存储时间戳
  setItem(TIME_STAMP, Date.now())
}
/**
 * 获取时间戳
 * @returns 时间戳的值
 */
export function getTimeStamp() {
  // 在本地存储中获取时间戳
  return getItem(TIME_STAMP)
}
/**
 *  判断 token 是否超时
 * @returns true 表示 token 超时
 */
export function isCheckTimeout() {
  // 获取当前时间戳
  const currentStamp = Date.now()
  // 获取登录时缓存的时间戳
  const timeStamp = getTimeStamp()
  // 判断是否超时
  return currentStamp - timeStamp > TOKEN_TIMEOUT_VALUE
}
