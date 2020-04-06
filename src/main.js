import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import '@/styles/variables.scss'
import './icons'

import navBar from '@/components/NavBar'
import TabsList from '@/components/TabsList'

Vue.component('nav-bar',navBar)
Vue.component('tabs-list',TabsList)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
