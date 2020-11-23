import Affix from 'easy-affix'
import ElementUI from 'element-ui'
import Print from 'vue-print-nb'

// 全局自定义组件库
const publicComponents = {
  install: function (Vue) {
    Vue.use(ElementUI);
    Vue.use(Print);
    Vue.component('affix', Affix)
  }
}

// 导出组件
export default publicComponents
