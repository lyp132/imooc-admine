import store from '@/store'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rt from 'dayjs/plugin/relativeTime'
/**
 * 处理时间解析
 * @param {*} val
 * @param {*} format
 * @returns
 */
export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    // 将传入的字符串转换为数字
    val = parseInt(val)
  }
  // console.log('解析后的时间', dayjs(val))
  // 解析时间戳，根据传入的占位符返回格式化后的日期。
  return dayjs(val).format(format)
}

// 加载相对时间插件
dayjs.extend(rt)
/**
 * 相对时间
 * @param {*} val
 * @returns
 */
function relativeTime(val) {
  if (!isNaN(val)) {
    // 将传入的字符串转换为数字
    val = parseInt(val)
  }
  return dayjs()
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
