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
          >
            <v-list-item-title class="item-title-hover">
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

      <v-btn v-on="on" href="/cart" icon>
        <v-badge content="2" value="2" color="green" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-bottom-navigation :value="activeBtn" color="primary" horizontal>
        <v-btn to="/" :class="{ 'navi-bottom-active': $route.path == '/' }">
          <span>Home</span>
        </v-btn>

        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              :class="{ 'navi-bottom-active': $route.name == 'shop' }"
            >
              <span>Shop</span>
            </v-btn>
          </template>
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              class="item-title-hover"
              to="/"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-card>
        </v-menu>

        <v-btn
          to="/login/1"
          :class="{ 'navi-bottom-active': $route.path == '/login' }"
        >
          <span>Product</span>
        </v-btn>

        <v-btn
          to="/signUp"
          :class="{ 'navi-bottom-active': $route.path == '/signUp' }"
        >
          <span>Blog</span>
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
      items: [{ title: 'SKATEBOARD' }, { title: 'ETC' }],

      userMenus: [
        {
          title: 'My Page',
          icon: 'mdi-account-details',
          click: this.userMyPage,
        },
        { title: 'Logout', icon: 'mdi-logout', click: this.userLogout },
      ],

      activeBtn: 1,
      on: '',
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
  },

  methods: {
    userLogout() {
      this.$store.commit('clearNickname');
      this.$store.commit('clearToken');
      this.$store.commit('clearUser');
      deleteCookie('til_auth');
      deleteCookie('til_user');
      deleteCookie('til_uuid');
    },
    userMyPage() {
      this.$router.push('/myPage');
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
  background-color: red;
  cursor: pointer;
}

.navi-bottom-active {
  background-color: lightgrey !important;
}
</style>
