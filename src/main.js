import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false
// 引入请求API
import * as ProductAPI from "@/api/product"
Vue.prototype.$PAPI = ProductAPI
// 权限管理的请求
import ACLAPI from "./api/acl/index"
Vue.prototype.$API = ACLAPI
// 引入全局组件
import Category from "@/components/Category/Category.vue"
Vue.component("Category",Category)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
