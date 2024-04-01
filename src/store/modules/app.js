import { LANG, TAGS_VIEW } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    // 侧边栏控制数据
    sidebarOpened: true,
    // 国际化
    language: getItem(LANG) || 'zh',
    // tags列表
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    // 控制侧边栏 sidebar 打开或者关闭
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    // 设置国际化
    setLanguage(state, lang) {
      state.language = lang
      setItem(LANG, lang)
    },
    /**
     * 添加tags
     * @param {*} state
     * @param {*} tag {} tag数据
     */
    addTagsViewList(state, tag) {
      // 查找成员
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path
      })
      // 没有重复的情况下，添加tag
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    /**
     * 为指定的tag 修改title
     * @param {*} state
     * @param {*} param1
     */
    changeTagsViewList(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    /**
     * 删除tag
     * @param {*} state
     * @param {type: 'other'||'right'||'index', index: index} payload 载荷
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        // 删除当前项
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        // 删除其他项
        // 删除右侧所有项
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        // 删除左侧所有项
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        // 删除右侧所有项
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
