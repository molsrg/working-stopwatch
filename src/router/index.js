import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeApp.vue'
import Stats from '../views/StatsApp.vue'
import Info from '../views/InfoApp.vue'
const routes = [
  {
    path: '/working-stopwatch/',
    component: Home
  },

  {
    path: '/working-stopwatch/stats',
    component: Stats
  },

  {
    path: '/working-stopwatch/info',
    component: Info
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
