import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: '/form/index',
  },

  {
    path: '/form/index',
    name: 'formIndex',
    component: () => import('../views/form/index.vue'),
    meta: {
      title: '设计表单',
      keepAlive: true
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
