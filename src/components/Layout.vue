<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->

      <v-toolbar-title style="width: 350px">
        <router-link to="/" class="white--text" style="text-decoration: none"
          ><v-icon>mdi-skateboard</v-icon>&nbsp;SkateMania</router-link
        >
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down pl-10 ml-4"
      />
      <v-spacer />

      <v-menu open-on-hover offset-y v-if="isUserLogin">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item
            v-for="(menu, index) in userMenus"
            :key="index"
            href="javascript:void(0)"
            @click="menu.click"
            class="item-title-hover"
          >
            <v-list-item-title>
              <v-icon class="userMenu" color="black">{{ menu.icon }}</v-icon>
              {{ menu.title }}</v-list-item-title
            >
          </v-list-item>
        </v-card>
      </v-menu>
      <v-toolbar-title v-else>
        <router-link
          to="/login"
          class="white--text"
          style="text-decoration: none"
        >
          Login
        </router-link>
      </v-toolbar-title>

      <v-btn v-on="on" @click="$router.push('/shop/cart')" icon>
        <v-badge :content="cartCount" color="green" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-bottom-navigation :value="activeBtn" color="primary" horizontal>
        <v-btn
          to="/main"
          :class="{
            'navi-bottom-active': $route.name == 'main',
            'navi-text': $route.name != 'main',
          }"
        >
          <span>Home</span>
        </v-btn>

        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              :class="{
                'navi-bottom-active': $route.meta.pathName == 'shop',
              }"
            >
              <span
                :class="{
                  'navi-text': $route.meta.pathName != 'shop',
                }"
                >Shop</span
              >
            </v-btn>
          </template>
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item
              v-for="(menu, index) in shopMenus"
              :key="index"
              class="item-title-hover"
              :to="menu.url"
            >
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item>
          </v-card>
        </v-menu>

        <v-btn
          to="/qa"
          class="navi-text"
          :class="{
            'navi-bottom-active': $route.name == 'qa',
            'navi-text': $route.name != 'qa',
          }"
        >
          <span>Q&A</span>
        </v-btn>

        <v-btn
          to="/contact"
          :class="{
            'navi-bottom-active': $route.name == 'contact',
            'navi-text': $route.name != 'contact',
          }"
          class="navi-text"
        >
          <span>Contact</span>
        </v-btn>
      </v-bottom-navigation>
    </v-main>

    <router-view />
    <v-footer :padless="true">
      <v-card flat tile width="100%" class="secondary white--text text-center">
        <v-card-text>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-home</v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-email</v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-calendar</v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-delete</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>ShipIT</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    <index-modal />
  </v-app>
</template>
<script>
import { deleteCookie } from '@/utils/cookies';
import indexModal from '@/components/modal/index';

export default {
  data() {
    return {
      shopMenus: [
        { title: 'SkateBoard', url: '/shop/skateboard/board' },
        { title: 'Clothes', url: '/shop/clothes/top' },
      ],

      userMenus: [
        {
          title: '내 계정',
          icon: 'mdi-account-details',
          click: this.userMyPage,
        },
        { title: '로그아웃', icon: 'mdi-logout', click: this.userLogout },
      ],
      items: [
        { title: 'T-Shirts' },
        { title: 'Jackets' },
        { title: 'Shirts' },
        { title: 'Jeans' },
        { title: 'Shoes' },
      ],

      activeBtn: 1,
      on: '',

      test: localStorage.length,
    };
  },
  components: {
    indexModal,
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
    logoLink() {
      return this.$store.getters.isLogin ? '/main' : '/login';
    },
    cartCount() {
      let count = 0;
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key != 'loglevel:webpack-dev-server') {
          count++;
        }
      }
      return count;
    },
  },

  watch: {
    test() {
      console.log('test');
    },
  },

  methods: {
    userLogout() {
      this.$store.commit('clearToken');
      this.$store.commit('clearUser');
      deleteCookie('til_auth');
      deleteCookie('til_user');
    },
    userMyPage() {
      this.$router.push('/myAccount/info');
    },
  },
};
</script>

<style scoped>
.userMenu {
  margin-right: 10px;
}

.router-link-exact-active {
  color: black;
}

.item-title-hover:hover {
  background-color: lightgrey;
  cursor: pointer;
}
.navi-text {
  color: grey !important;
}

.navi-bottom-active {
  background-color: lightgrey !important;
  color: black !important;
}

/* .bottom-navi {
  box-shadow: none !important;
  border: 1px solid lightgray !important;
} */
</style>
