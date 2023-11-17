import { createRouter, createWebHistory } from 'vue-router'

const files = import.meta.glob('../views/**/*.vue')
const routes = Object.entries(files).map(([key, value]) => {
  const name = key.replace(/^.*[\\\/]/, '').replace(/\.vue$/, '')
  return {
    path: `/${name === 'HomeView' ? '' : name}`,
    name: name,
    component: value
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
