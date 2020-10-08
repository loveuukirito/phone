import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' 
import axios from 'axios'
import {getNowTime} from './common/js/utl'
import './common/scss/ali-icon.scss'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.$getNowTime = getNowTime

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
