import Vue from 'vue'
import VueRouter from 'vue-router'
import AppMain from '@/layouts/AppMain'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '发现',
    component: AppMain,
    children: [
      {
        path: '/',
        component: () => import('@/views/appMain/recommend')
      },
      {
        path: '/discover',
        component: () => import('@/views/appMain/discover')
      },
      {
        path: '/clould-village',
        component:()=>import('@/views/appMain/clould-village')
      },
      {
        path: '/video',
        component:()=>import('@/views/appMain/video')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
