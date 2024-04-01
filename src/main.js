import i18n from '@/i18n'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 初始化样式表
import './styles/index.scss'
// 全局注册icon图标：导入 svgIcon 、elment icon
import installIcons from '@/icons'
// 导入路由鉴权
import './permission'
// 导入全局过滤器
import installFilter from '@/filters'
// 导入指令
import installDirective from '@/directives'

const app = createApp(App)
installIcons(app)
installFilter(app)
installDirective(app)
app.use(store).use(router).use(i18n).use(ElementPlus).mount('#app')
