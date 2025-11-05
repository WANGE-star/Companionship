import App from './App'
import router from './router' // 引入路由
// #ifndef VUE3
import Vue from 'vue'

import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import uView from 'uview-plus'
import uView from 'uview-ui'

//引入uview样式
import 'uview-plus/index.scss'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app.use(uView),
	app.use(router),//挂在路由
	return{app}
  }
}
// #endif