import { MAIN_COLOR } from '@/constant'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'
// 快捷访问，动态state
const getters = {
  token: (state) => state.user.token,
  /**
   * 动态数据：是否存在用户信息
   * @param {*} state
   * @returns true 表示存在用户信息
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  // 用户信息
  userInfo: (state) => state.user.userInfo,
  // css变量
  cssVar: (state) => {
    return {
      ...state.theme.variables,
      ...generateColors(getItem(MAIN_COLOR))
    }
  },
  // 侧边栏控制数据
  sidebarOpened: (state) => state.app.sidebarOpened,
  // 国际化
  language: (state) => state.app.language,
  // 主题色
  mainColor: (state) => state.theme.mainColor,
  // tags列表
  tagsViewList: (state) => state.app.tagsViewList
}

export default getters
