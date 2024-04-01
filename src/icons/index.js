import SvgIcon from '@/components/SvgIcon'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const svgRequire = require.context('./svg', false, /\.svg$/)

svgRequire.keys().forEach((svgicon) => svgRequire(svgicon))

export default (app) => {
  app.component('svg-icon', SvgIcon)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
