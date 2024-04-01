import request from '@/utils/request'

/**
 * 获取所有角色
 * @returns []
 */
export const roleList = () => {
  return request({
    url: '/role/list',
    method: 'GET'
  })
}

/**
 * 获取指定角色的权限
 * @param {*} roleId '' 角色ID
 * @returns
 */
export const rolePermission = (roleId) => {
  return request({
    url: `/role/permission/${roleId}`,
    method: 'GET'
  })
}

export const distributePermission = (data) => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
