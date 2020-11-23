import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './styles/index.scss' // global css
import PublicEnumeration from './global/PublicEnumeration'

import publicComponents from "@/utils/publicComponents.js";
Vue.use(publicComponents);
Vue.config.productionTip = false
Vue.prototype.$PublicEnumeration = PublicEnumeration //全局枚举库
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
