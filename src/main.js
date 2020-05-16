import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick';

import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import '@/styles/variables.scss'
import 'swiper/css/swiper.css'

import './icons'

import navBar from '@/components/NavBar'
import TabsList from '@/components/TabsList'
import Toast from '@/components/Toast'

Vue.component('nav-bar',navBar)
Vue.component('tabs-list',TabsList)
Vue.use(Toast)
// Vue.prototype.$toast = Toast

fastclick.attach(document.body)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
