<template>
  <div>
    <div class="row">
      <div class="col-md-2">
        <v-card height="700" width="256" class="mx-auto">
          <v-navigation-drawer permanent>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6"> 내 계정 </v-list-item-title>
                <v-list-item-subtitle> {{ nickname }} </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
              <!-- <router-link :to="test"> -->
              <v-list-item
                v-for="menu in menus"
                :key="menu.title"
                link
                tile
                :class="{
                  'navi-bottom-active': $route.path == `${menu.route}`,
                }"
                :to="menu.route"
              >
                <v-list-item-icon>
                  <v-icon>{{ menu.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ menu.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- </router-link> -->
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </div>
      <div class="col-md-10"><router-view /></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { title: '회원 정보', icon: 'mdi-home-city', route: '/myAccount/info' },
        {
          title: '주문내역',
          icon: 'mdi-account',
          route: '/myAccount/orderList',
        },
      ],
      nickname: this.$store.getters.getUser.nickname,
    };
  },
  methods: {},
};
</script>

<style scoped>
.navi-bottom-active {
  background-color: lightgrey !important;
}
a {
  text-decoration: none;
}
</style>
