import Vue from 'vue'
import VueRouter from 'vue-router'
import AppMain from '@/layouts/AppMain'
import InsidePage from '@/layouts/InsidePage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: AppMain,
    children: [
      {
        path: '/',
        name: 'Recommend',
        component: () => import('@/views/appMain/recommend'),
        meta: {
          title: '推荐'
        }
      },
      {
        path: '/discover',
        name: 'Discover',
        component: () => import('@/views/appMain/discover'),
        meta: {
          title: '发现'
        }
      },
      {
        path: '/clould-village',
        name: 'ClouldVillage',
        component: () => import('@/views/appMain/clould-village'),
        meta: {
          title: '云村'
        }
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import('@/views/appMain/video'),
        meta: {
          title: '视频'
        }
      }
    ]
  }, {
    path: '/',
    component: InsidePage,
    children: [
      {
        path: '/play-list',
        name: 'PlayList',
        component: () => import('@/views/playList/index.vue'),
        meta: {
          title: '歌单广场'
        }
      }
    ]
  }, {
    path: '/play-list-detail/:id',
    name: 'PlayListDetail',
    component: () => import('@/views/playList/detail.vue'),
    meta: {
      title: '歌单'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
