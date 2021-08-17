import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
   //重定向(首页)
    redirect: '/ebook'
  },
  {
    path: '/ebook',
    name: 'Index',
    children : [
        {
          path: ':fileName',
          component: () => import('../components/ebook/EbookReader')
        }
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ebook/Index')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

