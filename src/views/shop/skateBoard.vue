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
      <product
        v-for="pro in products"
        :key="pro.seq"
        :product="pro"
        :type="type"
        :imgHeight="imgHeight"
      ></product>
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
import product from '@/components/shop/product.vue';
export default {
  components: {
    product,
  },

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
