import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import LogIn from '../views/LogIn.vue';
import Product from '../views/Product.vue';
import Category from '../views/Category.vue';
import Cart from '../views/Cart.vue';
import MyAccount from '../views/MyAccount.vue';
import Checkout from '../views/Checkout.vue';
import store from '@/store';

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
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
      requireLogin: true,
    }
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
  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
      requireLogin: true,
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'LogIn', query: { to: to.path }});
  } else {
    next();
  }
})

export default router
