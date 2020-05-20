import Vue from 'vue'
import VueRouter from 'vue-router'
import AppMain from '@/layouts/AppMain'
import InsidePage from '@/layouts/InsidePage'
Vue.use(VueRouter)
// 需要缓存得组件必须设置key
const routes = [
  {
    path: '/',
    redirect:'/discover',
    component: AppMain,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/appMain/home'),
        meta: {
          title: '推荐',
          key:'/',
          keepAlive: true
        }
      },
      {
        path: '/discover',
        name: 'Discover',
        component: () => import('@/views/appMain/discover'),
        meta: {
          title: '发现',
          key:'/',
          keepAlive: true
        }
      },
      {
        path: '/cloud-village',
        name: 'CloudVillage',
        component: () => import('@/views/appMain/cloud-village'),
        meta: {
          title: '云村',
          key:'/',
          keepAlive: true
        }
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import('@/views/appMain/video'),
        meta: {
          title: '视频',
          key:'/',
          keepAlive: true
        }
      }
    ]
  }, {
    path: '/',
    component: InsidePage,
    children: [
      {
        path: '/play-list',
        name: 'PlayListPage',
        component: () => import('@/views/play-list'),
        meta: {
          title: '歌单广场'
        }
      },
      {
        path: '/rank',
        name: 'RankPage',
        component: () => import('@/views/rank'),
        meta: {
          title: '排行榜'
        }
      }, {
        path: '/singer',
        name: 'Singer',
        component: () => import('@/views/singer'),
        meta: {
          title: '歌手'
        }
      }
    ]
  }, {
    path: '/play-list-detail/:id',
    name: 'PlayListDetail',
    component: () => import('@/views/play-list/detail.vue'),
    meta: {
      title: '歌单',
      type: 'playList'
    }
  }, {
    path: '/singer-detail/:id',
    name: 'SingerDetail',
    component: () => import('@/views/play-list/detail.vue'),
    meta: {
      title: '歌手',
      type: 'singer'
    }
  }, {
    path: '/albums-detail/:id',
    name: 'AlbumsDetail',
    component: () => import('@/views/play-list/detail.vue'),
    meta: {
      title: '专辑',
      type: 'albums'
    }
  }, {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search'),
    meta: {
      title: '搜索'
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
