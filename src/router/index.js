import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/views/Auth';
import Shop from '@/views/Shop';
import store from '../store'
import Admin from "@/views/admin/Admin";


const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account'),
    meta: {
      layout: 'main',
      auth: true
    },
    children: [
      {
        path: 'notifications'
      },
      {
        path: 'orders'
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/stock',
    component: Admin,
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    },
    children: [
      {
        path: 'stock',
        name: 'Stock',
        component: () => import('../views/admin/Stock')
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('../views/admin/Categories'),
      },
      {
        path: 'product/:id',
        name: 'AdminProduct',
        component: ()=> import('../views/admin/Product')
      },
      {
        path: 'orders',
        name: 'Orders',
        component: ()=> import('../views/admin/Orders')
      },
      {
        path: '/order/:id',
        name: 'Order',
        component: ()=> import('../views/admin/Order')
      }
    ]
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart'),
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/',
    name: 'Shop',
    component: Shop,
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ()=> import('../views/Product'),
    meta: {
      layout: 'main'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next)=> {
  const requireAuth = to.meta.auth
  const requireAdmin = to.meta.admin

  if(requireAdmin) {
    if(store.getters['auth/isAdmin']) {
      return next()
    } else {
      return next('/auth?message=admin')
    }
  }
  if(requireAuth) {
    if(store.getters['auth/isAuthenticated']) {
      return next()
    } else {
      return next('/auth?message=auth')
    }
  }

  next()

  // if(requireAuth && store.getters['auth/isAuthenticated']) {
  //   next()
  // } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
  //   next('/auth?message=auth')
  // } else {
  //   next()
  // }
})

export default router
