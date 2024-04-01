import print from 'vue3-print-nb'
import permission from './permission'

export default (app) => {
  // 打印
  app.use(print)
  // 功能受控指令
  app.directive('permission', permission)
}
