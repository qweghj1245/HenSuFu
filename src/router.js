import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '*',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('./components/Homepage.vue'),
    },
    {
      path: '/login',
      component: () => import('./components/pages/Login.vue'),
    },
    {
      path: '/shop',
      component: () => import('./components/Shop.vue'),
    },
    {
      path: '/uniqueinfo/:id',
      component: () => import('./components/Product.vue'),
    },
    {
      path: '/cart',
      component: () => import('./components/Cart.vue'),
    },
    {
      path: '/customer_order',
      component: () => import('./components/CustomerOrder.vue'),
    },
    {
      path: '/customer_checkout/:orderId',
      component: () => import('./components/CustomerCheckout.vue'),
    },
    {
      path: '/ordercus',
      component: () => import('./components/OrderForCus.vue'),
    },
    {
      path: '/admin',
      component: () => import('./components/pages/Dashboard.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          component: () => import('./components/pages/Products.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'order',
          component: () => import('./components/pages/Order.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          component: () => import('./components/pages/Coupon.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
