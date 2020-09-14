import { createRouter, createWebHistory } from 'vue-router'
import * as urls from './routePath'
import Home from '@/pages/index.vue'

const routes = [
  {
    path: urls.BASE_URL,
    name: 'home',
    component: Home,
  }
]

const router = createRouter({
  history: createWebHistory(urls.BASE_URL),
  routes
})
// vueRouter.beforeEach((to, from, next) => {
//   const accessToken = sessionStorage.getItem('Authorization') || localStorage.getItem('Authorization')
//   if (accessToken) {
//     next()
//   } else {
//     next(`${window.location.origin}/login`)
//   }
// })

export default router
