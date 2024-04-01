import request from '@/utils/request'

/**
 * 获取用户列表数据
 * @returns promise对象
 */
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    method: 'GET',
    params: data
  })
}
/**
 * 批量导入用户
 * @param {*} data []
 * @returns
 */
export const userBatchImport = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}
/**
 * 删除用户
 * @param {*} id String 用户id
 * @returns
 */
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/detele/${id}`,
    method: 'GET'
  })
}
/**
 * 获取所用用户列表
 * @returns
 */
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list',
    method: 'GET'
  })
}

/**
 * 获取员工详情
 * @param {*} id '' 用户id
 * @returns
 */
export const userDetail = (id) => {
  return request({
    url: `/user-manage/detail/${id}`,
    method: 'GET'
  })
}
/**
 * 获取指定用户角色
 * @param {*} userId
 * @returns
 */
export const userRoles = (userId) => {
  return request({
    url: `/user-manage/role/${userId}`,
    method: 'GET'
  })
}
/**
 * 更新用户角色
 * @param {*} userId '' 用户id
 * @param {*} roles []
 * @returns
 */
export const updateRole = (userId, roles) => {
  return request({
    url: `/user-manage/update-role/${userId}`,
    method: 'POST',
    data: {
      roles
    }
  })
}
