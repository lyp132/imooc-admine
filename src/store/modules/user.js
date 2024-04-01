// 发送请求获取信息
import { getUserInfo, login } from '@/api/sys'
import { TOKEN } from '@/constant/index'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/auth'
import { getItem, removeAllItem, setItem } from '@/utils/storage'
import md5 from 'md5'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    // 在vuex中存储token
    setToken(state, token) {
      state.token = token
      // 在本地存储中存储token
      setItem(TOKEN, token)
    },
    // 在vuex 中存储用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 登录请求动作
     * @param {*} context
     * @param {*} userInfo
     * @returns
     */
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        // 发送登录请求
        login({
          username,
          password: md5(password)
        })
          // 登录成功
          .then((data) => {
            // 设置时间戳
            setTimeStamp()
            // 两种设置数据的方法。两者命名空间不同
            // 第一种：this 表示顶级命名空间下的 context
            this.commit('user/setToken', data.token)
            // 第二种：context 是具体命名空间的  this
            // context.commit('setToken', data.data.data.token)
            router.push('/')
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    /**
     * 获取用户信息请求动作
     * @param {*} context
     * @returns
     */
    async getUserInfo(context) {
      // 发送获取用户信息请求
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    /**
     * 退出登录动作
     */
    logout() {
      // 清理掉当前用户缓存数据
      // 重置路由表数据:删除动态路由
      resetRouter()
      // 1.清理vuex中存储的数据
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      // 2.清除本地缓存中的数据
      removeAllItem()
      // TODO：清理掉权限相关配置

      // 进入login页面
      router.push('/login')
    }
  }
}
