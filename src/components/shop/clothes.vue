<template>
  <div>
    <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>

    <v-row dense>
      <v-col cols="12" sm="8" class="pl-6 pt-6">
        <small>Showing 1-12 of 200 products</small>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <div class="row text-center">
      <div
        class="col-md-3 col-sm-6 col-xs-12"
        :key="pro.id"
        v-for="pro in products"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" color="grey lighten-4" max-width="600">
            <v-img
              class="white--text align-end"
              :aspect-ratio="16 / 9"
              height="480px"
              width="auto"
              :src="pro.src"
            >
              <!-- <v-card-title>{{ pro.type }} </v-card-title> -->
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="
                    d-flex
                    transition-fast-in-fast-out
                    white
                    darken-2
                    v-card--reveal
                    display-3
                    white--text
                  "
                  style="height: 100%"
                >
                  <v-btn v-if="hover" href="/product" class="" outlined
                    >VIEW</v-btn
                  >
                  <v-btn v-if="hover" href="/product" class="ml-2" outlined
                    >CART</v-btn
                  >
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-text class="text--primary">
              <div>
                <a href="/product" style="text-decoration: none">{{
                  pro.name
                }}</a>
              </div>
              <div>{{ pro.price }}원</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </div>
    </div>
    <div class="text-center mt-12">
      <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      breadcrums: [
        {
          text: 'shop',
          disabled: true,
          href: '',
        },
        {
          text: 'clothes',
          disabled: true,
          href: '',
        },
        {
          text: this.$route.meta.name,
          disabled: false,
          href: '',
        },
      ],
      routeName: this.$route.meta.name,

      products: [
        {
          id: 1,
          name: 'BLACK TEE',
          type: 'Jackets',
          price: '180000',
          src: require('@/assets/img/shop/board/board_1.png'),
        },
        {
          id: 2,
          name: 'WHITE TEE',
          type: 'Polo',
          price: '40.00',
          src: require('@/assets/img/shop/board/board_2.png'),
        },
        {
          id: 3,
          name: 'Zara limited...',
          type: 'Denim',
          price: '25.00',
          src: require('@/assets/img/shop/board/board_3.png'),
        },
        {
          id: 4,
          name: 'SKULL TEE',
          type: 'Jackets',
          price: '30.00',
          src: require('@/assets/img/shop/board/board_4.png'),
        },
        {
          id: 5,
          name: 'MANGO WINTER',
          type: 'Sweaters',
          price: '50.00',
          src: require('@/assets/img/shop/board/board_5.png'),
        },
        {
          id: 6,
          name: 'SHIRT',
          type: 'Denim',
          price: '34.00',
          src: require('@/assets/img/shop/board/board_6.png'),
        },
        {
          id: 7,
          name: 'TRUCKER JACKET',
          type: 'Jackets',
          price: '38.00',
          src: require('@/assets/img/shop/board/board_7.png'),
        },
        {
          id: 8,
          name: 'COATS',
          type: 'Jackets',
          price: '25.00',
          src: require('@/assets/img/shop/board/board_8.png'),
        },
      ],
    };
  },
  created() {
    console.log(this.$route.name);
  },
  watch: {
    $route(to) {
      this.breadcrums[2].text = to.meta.name;
    },
  },
};
</script>

<style></style>
