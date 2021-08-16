import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/components/Layout';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import('@/views/Main'),
        name: 'main',
      },
      {
        path: '/login',
        component: () => import('@/views/auth/Login'),
        meta: { test1: 'test1', test2: 'test2' },
      },
      {
        path: '/signUp',
        component: () => import('@/views/auth/signUp'),
        name: 'signUp',
      },
      {
        path: '/myAccount',
        component: () => import('@/views/auth/myAccount'),
        name: 'myAccount',
        children: [
          {
            path: '/myAccount/info',
            component: () => import('@/views/auth/info'),
          },
          {
            path: '/myAccount/orderList',
            component: () => import('@/views/auth/orderList'),
          },
        ],
      },
      {
        path: '/shop',
        component: () => import('@/views/shop/shop'),
        name: 'shop',
        meta: { name: 'shop' },
        children: [
          {
            path: '/shop/skateboard',
            component: () => import('@/views/shop/skateBoard'),
            children: [
              {
                path: '/shop/skateboard/board',
                component: () => import('@/views/shop/skateBoard'),
                name: 'shop',
                meta: { name: 'board', id: 1, children: 2 },
              },
              {
                path: '/shop/skateboard/helmet',
                component: () => import('@/views/shop/skateBoard'),
                name: 'shop',
                meta: { name: 'helmet', id: 1, children: 3 },
              },
            ],
          },
          {
            path: '/shop/clothes',
            component: () => import('@/views/shop/clothes'),
            name: 'clothes',
            children: [
              {
                path: '/shop/clothes/tops',
                component: () => import('@/views/shop/clothes'),
                name: 'shop',
                meta: { name: 'tops', id: 4, children: 5 },
              },
              {
                path: '/shop/clothes/bottoms',
                component: () => import('@/views/shop/clothes'),
                name: 'shop',
                meta: { name: 'bottoms', id: 4, children: 6 },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/oauth/error',
    component: () => import('@/views/OauthError'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('인증이 필요합니다');
    next('/login');
    return;
  }
  next();
});

export default router;
