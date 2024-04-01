import request from '@/utils/request'

/**
 * 获取项目功能
 * @returns promise对象
 */
export const feature = () => {
  return request({ url: '/user/feature', method: 'get' })
}

/**
 * 获取项目章节
 * @returns promise对象
 */
export const chapter = () => {
  return request({ url: '/user/chapter', method: 'get' })
}
