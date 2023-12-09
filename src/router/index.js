import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeApp.vue'
import Stats from '../views/StatsApp.vue'
import Info from '../views/InfoApp.vue'
const routes = [
  {
    path: '',
    component: Home
  },

  {
    path: '/stats',
    component: Stats
  },

  {
    path: '/info',
    component: Info
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
