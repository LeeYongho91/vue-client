import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/auth';

Vue.use(Vuex);

// let userState = {
//   test1: 'test1',
//   test2(state, user) {
//     console.log('test2');
//     state.user = user;
//   },
// };

export default new Vuex.Store({
  state: {
    token: getAuthFromCookie() || '',
    user: getUserFromCookie() || '',
    // ...userState,
  },
  getters: {
    isLogin(state) {
      return state.user !== '';
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = '';
    },
    clearUser(state) {
      state.user = '';
    },
  },
  actions: {
    async LOGIN({ dispatch }, userData) {
      const { data } = await loginUser(userData);
      dispatch('stateCookieSet', data);
      return data;
    },

    async SNS_LOGIN({ dispatch }, snsData) {
      dispatch('stateCookieSet', snsData);
    },

    stateCookieSet({ commit }, userData) {
      const data = userData;
      console.log(data);
      commit('setUser', JSON.stringify(data.user));
      saveUserToCookie(JSON.stringify(data.user));
      saveAuthToCookie(data.token.token);
    },
  },
});
