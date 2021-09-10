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
                @update:active="linkMove"
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
            { id: 2, name: 'Borad', to: '/shop/skateBoard/board' },
            { id: 3, name: 'Helmets', to: '/shop/skateBoard/helmet' },
          ],
        },
        {
          id: 4,
          name: 'clothes',
          children: [
            { id: 5, name: 'Top', to: '/shop/clothes/top' },
            { id: 6, name: 'Bottom', to: '/shop/clothes/bottom' },
          ],
        },
      ],
      routeId: this.$route.meta.id,
      routeChildId: this.$route.meta.children,
      route: this.$router.currentRoute.path,
    };
  },

  methods: {
    linkMove(node) {
      const id = parseInt(node[0]);

      for (let obj of this.items) {
        let children = obj.children;
        for (let route of children) {
          if (route.id == id) {
            this.$router.push(route.to).catch(() => {});
          }
        }
      }
    },
  },
  created() {
    //  console.log(this.route);
  },
  watch: {
    $route(to) {
      this.routeId = to.meta.id;
      this.routeChildId = to.meta.children;
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
