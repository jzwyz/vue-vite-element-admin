import { createRouter, createWebHistory } from 'vue-router'
import { config } from './config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: config
})

export default router
