<template>
  <div class="col-md-3 col-sm-6 col-xs-12">
    <v-hover v-slot:default="{ hover }">
      <v-card class="mx-auto" color="grey lighten-4" max-width="600">
        <v-img
          class="white--text align-end"
          :aspect-ratio="16 / 9"
          :height="imgHeight"
          width="auto"
          :src="require(`../../assets/img/shop/${type}/${product.img}.png`)"
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
              <v-btn
                v-if="hover"
                @click="routeMove(product.seq)"
                class=""
                outlined
                >VIEW</v-btn
              >
              <v-btn v-if="hover" @click="cartAdd" class="ml-2" outlined
                >CART</v-btn
              >
            </div>
          </v-expand-transition>
        </v-img>
        <v-card-text class="text--primary" style="height: 120px">
          <div>
            <a href="/product" style="text-decoration: none; font-size: 10px">{{
              product.name
            }}</a>
          </div>
          <div style="font-size: 12px">
            {{ product.price | numberWithCommas }} 원
          </div>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import Bus from '@/utils/Bus';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    imgHeight: {
      type: String,
      required: true,
    },
    breadcrums: {
      type: Array,
      required: true,
    },
  },

  methods: {
    routeMove(product_id) {
      this.$router.push({
        path: `/shop/detail/${product_id}`,
        query: {
          cate_1: `${this.breadcrums[1].text}`,
          cate_2: `${this.breadcrums[2].text}`,
        },
      });
    },
    cartAdd() {
      const id = this.product.seq;
      let product = localStorage.getItem(id);

      if (product !== null) {
        product = JSON.parse(product);
        product['count'] += 1;
        localStorage.setItem(id, JSON.stringify(product));
      } else {
        let product = this.product;
        product['count'] = 1;
        localStorage.setItem(id, JSON.stringify(product));
      }
      Bus.$emit('cartCountRefresh');
    },
  },
};
</script>

<style></style>
