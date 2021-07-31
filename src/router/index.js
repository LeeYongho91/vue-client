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
        component: () => import('@/views/Login'),
      },
      {
        path: '/signUp',
        component: () => import('@/views/signUp'),
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
