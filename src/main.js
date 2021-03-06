import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueCookies from 'vue-cookies';
import { numberWithCommas, formatDate } from '@/utils/filters';

Vue.config.productionTip = false;
Vue.use(VueCookies);

Vue.filter('numberWithCommas', numberWithCommas);
Vue.filter('formatDate', formatDate);

new Vue({
  router,
  store,
  vuetify,

  render: h => h(App),
}).$mount('#app');
