import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAuthFromCookie,
  getUserFromCookie,
  getUuidFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
  saveUuidToCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uuid: getUuidFromCookie() || '',
    nickname: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
  },
  getters: {
    isLogin(state) {
      return state.nickname !== '';
    },
  },
  mutations: {
    setUuid(state, uuid) {
      state.uuid = uuid;
    },
    setNickname(state, nickname) {
      state.nickname = nickname;
    },
    clearNickname(state) {
      state.nickname = '';
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
      commit('setUuid', data.user.uuid);
      commit('setToken', data.token.token);
      commit('setNickname', data.user.nickname);
      saveAuthToCookie(data.token.token);
      saveUserToCookie(data.user.nickname);
      saveUuidToCookie(data.user.uuid);
    },
  },
});
