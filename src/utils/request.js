import store from '@/store'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
// 为 service 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    //  在请求拦截器中配置 icode：添加 icode
    config.headers.icode = '01147C2DDF3B04F2'
    // 请求时统一注入token
    if (store.getters.token) {
      // 如果token 存在，则统一注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 配置接口国际化
    config.headers['Accept-Language'] = store.getters.language
    // 必须返回 config
    return config
  },
  (error) => {
    // 消息提示
    ElMessage.error(error.message)
    return Promise.reject(new Error(error))
  }
)

// 响应拦截器
service.interceptors.response.use(
  // 请求成功
  (response) => {
    // get请求
    const { success, message, data } = response.data
    // 判断当前请求是否成功
    if (success) {
      // 成功返回解析后的数据
      return data
    } else {
      // 失败（请求成功，业务失败），消息提示
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败
  (error) => {
    // 处理token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token 超时则进行退出登录动作
      store.dispatch('user/logout')
    }
    // 失败（请求成功，业务失败），消息提示
    ElMessage.error(error.message)
    return Promise.reject(new Error(error))
  }
)
export default service
