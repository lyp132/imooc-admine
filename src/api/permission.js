import request from '@/utils/request'

/**
 * 获取用户权限列表
 * @returns []
 */
export const permissionList = () => {
  return request({
    url: '/permission/list',
    method: 'GET'
  })
}
