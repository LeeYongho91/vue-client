<template>
  <div>
    <v-breadcrumbs class="pb-0 mb-2" :items="breadcrums"></v-breadcrumbs>
    <v-divider></v-divider>

    <v-row dense class="mb-5">
      <v-col cols="12" sm="8" class="pl-6 pt-6">
        <small
          >Showing {{ startShowCount }}- {{ endShowCount }} of
          {{ totalCount }} products</small
        >
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
              :height="imgHeight"
              width="auto"
              :src="require(`../../assets/img/shop/${type}/${pro.img}.png`)"
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
            <v-card-text class="text--primary" style="height: 120px">
              <div>
                <a
                  href="/product"
                  style="text-decoration: none; font-size: 10px"
                  >{{ pro.name }}</a
                >
              </div>
              <div style="font-size: 12px">
                {{ pro.price | numberWithCommas }} 원
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </div>
    </div>
    <div class="text-center mt-12">
      <v-pagination
        v-model="page"
        :length="length"
        :total-visible="totalVisible"
        @input="pageMove"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { getProduct } from '@/api/shop';
export default {
  data() {
    return {
      page: 1,
      list: 8,

      totalCount: 0,
      totalVisible: 10,
      breadcrums: [
        {
          text: 'shop',
          disabled: true,
          href: '',
        },
        {
          text: 'skateBoard',
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
      type: this.$route.meta.name,
      products: [],

      productsCount: 0,

      imgHeight: '480px',
    };
  },

  methods: {
    async getProduct() {
      try {
        const type = this.routeName;
        const page = this.page;
        const list = this.list;

        const params = JSON.stringify({ type, page, list });
        const { data } = await getProduct(params);

        this.products = data.products;
        this.productsCount = data.products.length;
        this.totalCount = data.count;
        this.type = type;
      } catch (error) {
        console.log(error.response.data);
      }
    },

    imgHeightSetting() {
      if (this.routeName == 'board') {
        this.imgHeight = '480px';
      } else if (this.routeName == 'helmet') {
        this.imgHeight = '220px';
      }
    },

    pageMove(page) {
      this.page = page;
      this.getProduct();
    },
  },
  created() {
    this.getProduct();
  },
  watch: {
    $route(to) {
      this.breadcrums[2].text = to.meta.name;
      this.routeName = to.meta.name;
      this.imgHeightSetting();
      this.getProduct();
    },
  },

  computed: {
    length() {
      return Math.ceil(this.totalCount / this.list);
    },
    startShowCount() {
      return (this.page - 1) * this.list + 1;
    },
    endShowCount() {
      return this.startShowCount + this.productsCount - 1;
    },
  },
};
</script>

<style></style>
