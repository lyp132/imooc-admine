import request from '@/utils/request'

/**
 * 获取所有文章
 * @param {*} data {} 页码，每页条数
 * @returns {}
 */
export const getArticleList = (data) => {
  return request({
    url: '/article/list',
    method: 'GET',
    params: data
  })
}

/**
 * 修改文章排名
 * @param {*} data {} 文章排名
 * @returns
 */
export const articleSort = (data) => {
  return request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}

/**
 * 删除文章
 * @param {*} articleId String 文章ID
 * @returns
 */
export const deleteArticle = (articleId) => {
  return request({
    url: `/article/delete/${articleId}`,
    method: 'GET'
  })
}

/**
 * 查看文章详情
 * @param {*} articleId String 文章ID
 * @returns {}
 */
export const articleDetail = (articleId) => {
  return request({
    url: `/article/${articleId}`,
    method: 'GET'
  })
}

/**
 * 创建文章
 * @param {*} data {}
 * @returns {}
 */
export const articleCreate = (data) => {
  return request({
    url: '/article/create',
    method: 'POST',
    data
  })
}

/**
 * 编辑文章
 * @param {*} data {}
 * @returns {}
 */
export const articleEdit = (data) => {
  return request({
    url: '/article/edit',
    method: 'POST',
    data
  })
}
