import { createRouter, createWebHistory } from 'vue-router'
import Auth from "@/views/Auth";
import Shop from "@/views/Shop";


const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      layout: "auth"
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: ()=> import('../views/Cart'),
    meta: {
      layout: "main"
    }
  },
  {
    path: '/',
    name: 'Shop',
    component: Shop,
    meta: {
      layout: "main"
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ()=> import('../views/Product')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
