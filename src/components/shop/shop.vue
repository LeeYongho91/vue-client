<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-3 col-sm-3 col-xs-12">
          <v-card outlined>
            <v-card-title>Shop</v-card-title>
            <v-divider></v-divider>
            <template>
              <v-treeview
                :items="items"
                :open="[routeId]"
                :active="[routeChildId]"
                :selected-color="'#fff'"
                activatable
                open-on-click
                dense
                @update:active="test"
              >
              </v-treeview>
            </template>
          </v-card>
        </div>
        <div class="col-md-9 col-sm-9 col-xs-12">
          <router-view />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'skateBoard',
          children: [
            { id: 2, name: 'skateBorads', to: '/shop/skateBoard' },
            { id: 3, name: 'Helmets', to: '/shop/skateBoard' },
          ],
        },
        {
          id: 4,
          name: 'Clothes',
          children: [
            { id: 5, name: 'Tops', to: '/shop/clothes' },
            { id: 6, name: 'Bottoms', to: '/shop/clothes' },
          ],
        },
      ],
      routeId: this.$route.meta.id,
      routeChildId: this.$route.meta.children,
      route: this.$router.history.current.path,
    };
  },

  methods: {
    test(node) {
      console.log('TEST', node);
    },
  },
  created() {
    //console.log(this.route);
  },
  watch: {
    $route(to, from) {
      //   if (to.path != from.path) {
      //     /* router path가 변경될 때마다 서버로 접근로그를 저장한다. */ axios.post(
      //       '/lc/access-log',
      //     );
      //   }
      console.log(to);
      console.log(from);
    },
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>
