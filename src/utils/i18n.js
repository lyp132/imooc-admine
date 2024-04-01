import i18n from '@/i18n'
import store from '@/store'
import { watch } from 'vue'

// 将title转化为国际化内容
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}

/**
 * 监听语言变化，重新计算数据源
 * @param  {...any} cbs [] 偶有的回掉函数
 */
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => {
        // cb(store.getters.language)
        cb()
      })
    }
  )
}
