import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home/index.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/allForm',
    name: 'allForm',
    component: () => import('../views/allForm/index.vue')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/history/index.vue'),
    meta:{
      keepAlive:true,//需要缓存的页面
      isFresh:false,//是否刷新页面
      scrollTop: 0,//缓存时，当前页面的高度
    }
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
