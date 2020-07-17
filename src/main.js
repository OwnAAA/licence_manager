import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/css/global.css'
import './assets/css/fonts.css'
import axios from 'axios'

axios.defaults.baseURL = 'api' 
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
