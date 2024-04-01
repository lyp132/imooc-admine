import router from '@/router/index.js'
import store from '@/store'

function checkPermission(el, binding) {
  // 获取对应的功能权限
  const { value } = binding
  // 获取当前用户的所有功能权限
  const points = store.getters.userInfo.permission.points
  // 当传入的指令集未数组时
  if (value && value instanceof Array) {
    // 是否匹配到对应指令
    const hasPermission = points.some((point) => {
      return value.includes(point)
    })
    // 如果无法匹配，则表示当前用户无该指令，需删除对应的功能按钮
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
      // 删除导入用工按钮后，删除对应路由
      if (value.includes('importUser')) {
        router.removeRoute('import')
      }
    }
  } else {
    throw new Error('v-permission value is ["admin","editor"]')
  }
}

export default {
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  update(el, binding) {
    checkPermission(el, binding)
  }
}
