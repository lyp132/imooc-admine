import request from '@/utils/request'
/**
 * 登录
 * @param { 用户名, 密码 } data
 * @returns promise对象
 */
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
/**
 *  获取用户信息
 * @returns promise对象
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/profile',
    method: 'GET'
  })
}
