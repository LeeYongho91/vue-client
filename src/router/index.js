import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/components/Layout';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,

    // 첫 페이지 /main으로 리다이렉션
    children: [
      {
        path: '/',
        redirect: '/main',
      },
      // 메인페이지
      {
        path: '/main',
        component: () => import('@/views/Main'),
        name: 'main',
      },
      // 로그인 페이지
      {
        path: '/login',
        component: () => import('@/views/auth/Login'),
        meta: { test1: 'test1', test2: 'test2' },
      },
      // 회원가입 페이지
      {
        path: '/signUp',
        component: () => import('@/views/auth/signUp'),
        name: 'signUp',
      },
      // 내 계정 페이지
      {
        path: '/myAccount',
        component: () => import('@/views/auth/myAccount'),
        name: 'myAccount',
        children: [
          // 내 정보 페이지
          {
            path: '/myAccount/info',
            component: () => import('@/views/auth/info'),
          },
          // 내 주문리스트 페이지
          {
            path: '/myAccount/orderList',
            component: () => import('@/views/auth/orderList'),
          },
        ],
      },
      // shop 페이지
      {
        path: '/shop',
        component: () => import('@/views/shop/shop'),

        children: [
          {
            // 스케이트 보드 페이지
            path: '/shop/skateboard',
            component: () => import('@/views/shop/skateBoard'),
            children: [
              {
                // 보드 페이지
                path: '/shop/skateboard/board',
                component: () => import('@/views/shop/skateBoard'),

                meta: { name: 'board', id: 1, children: 2, pathName: 'shop' },
              },
              {
                // 헬멧 페이지
                path: '/shop/skateboard/helmet',
                component: () => import('@/views/shop/skateBoard'),

                meta: { name: 'helmet', id: 1, children: 3, pathName: 'shop' },
              },
            ],
          },
          {
            path: '/shop/clothes',
            // clothes 페이지
            component: () => import('@/views/shop/clothes'),
            name: 'clothes',
            children: [
              {
                // top 페이지
                path: '/shop/clothes/top',
                component: () => import('@/views/shop/clothes'),

                meta: { name: 'top', id: 4, children: 5, pathName: 'shop' },
              },
              {
                // bottom 페이지
                path: '/shop/clothes/bottom',
                component: () => import('@/views/shop/clothes'),

                meta: { name: 'bottom', id: 4, children: 6, pathName: 'shop' },
              },
            ],
          },
        ],
      },
      // 상품 상세페이지
      {
        path: 'shop/detail/:id',
        component: () => import('@/views/shop/detail'),
        name: 'detail',
        meta: { pathName: 'shop' },
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
