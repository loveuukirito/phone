import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {getNowTime, getNowDate} from './common/js/utl'
import './common/scss/ali-icon.scss' 
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false
Vue.prototype.$getNowTime = getNowTime
Vue.prototype.$getNowDate = getNowDate
Vue.use(VueResource)
Vue.use(VueI18n)
const i18n = new VueI18n({
   locale: 'zh', // 定义默认语言为中文  
   messages: {  
      'zh': require('@/assets/languages/zh.json'),
      'en': require('@/assets/languages/en.json')
    }
  }); 
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
