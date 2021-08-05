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
      },
      {
        path: '/login',
        component: () => import('@/views/auth/Login'),
        meta: { test1: 'test1', test2: 'test2' },
      },
      {
        path: '/signUp',
        component: () => import('@/views/auth/signUp'),
        name: 'shop',
      },
      {
        path: '/myPage',
        component: () => import('@/views/auth/myPage'),
        name: 'myPage',
        children: [
          {
            path: '/myPage/info',
            component: () => import('@/views/auth/info'),
          },
          {
            path: '/myPage/orderList',
            component: () => import('@/views/auth/orderList'),
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
