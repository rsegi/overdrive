import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import LogIn from '../views/LogIn.vue';
import Product from '../views/Product.vue';
import Category from '../views/Category.vue';
import Cart from '../views/Cart.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-up',
    name: 'Register',
    component: Register
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:category/:productId',
    name: 'Product',
    component: Product
  },
  {
    path: '/:categories/:categoryId',
    name: 'Category',
    component: Category 
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
