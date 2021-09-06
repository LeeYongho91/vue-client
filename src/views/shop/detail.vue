<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-carousel>
            <v-carousel-item :src="img" :style="imgStyle"> </v-carousel-item>
          </v-carousel>
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12">
          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>
          <div class="pl-6">
            <p class="display-1 mb-0">{{ product.name }}</p>
            <v-card-actions class="pa-0">
              <p class="headline font-weight-light pt-3">
                {{ product_price }}원
                <del style="" class="subtitle-1 font-weight-thin">$80.00</del>
              </p>
              <v-spacer></v-spacer>
              <v-rating
                v-model="rating"
                class=""
                background-color="warning lighten-3"
                color="warning"
                dense
              ></v-rating>
              <span class="body-2 font-weight-thin"> 25 REVIEWS</span>
            </v-card-actions>
            <p class="subtitle-1 font-weight-thin">
              {{ product_detail.description }}
            </p>

            <p class="title">ITEMS</p>

            <v-text-field
              outlined
              style="width: 100px"
              :value="product_detail.stock"
              dense
            ></v-text-field>
            <v-btn class="primary white--text" outlined tile dense
              ><v-icon>mdi-cart</v-icon> ADD TO CART</v-btn
            >
            <v-btn class="ml-4 primary white--text" outlined tile>BUY</v-btn>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs>
            <v-tab>Description</v-tab>
            <v-tab>Q/A</v-tab>
            <v-tab>REVIEWS</v-tab>
            <v-tab-item>
              <description :img="img" />
            </v-tab-item>
            <v-tab-item>
              <qa :product_id="product_id" />
            </v-tab-item>
            <v-tab-item>
              <v-list :three-line="true" avatar="true">
                <v-list-item-group v-model="item" color="primary">
                  <review
                    v-for="(item, index) in items"
                    :key="index"
                    :item="item"
                    :rating="rating"
                  />
                </v-list-item-group>
              </v-list>
            </v-tab-item>
          </v-tabs>
          <v-divider></v-divider>
          <v-card-text
            class="pa-0 pt-4"
            tile
            outlined
            style="margin-top: 100px"
          >
            <p class="subtitle-1 font-weight-light pt-3 text-center">
              YOU MIGHT ALSO LIKE
            </p>
            <v-divider></v-divider>
            <div class="row text-center">
              <likeProducts
                v-for="pro in likeProducts"
                :key="pro.seq"
                :product="pro"
              />
            </div>
          </v-card-text>
        </div>
      </div>
    </v-container>
    <v-card class="accent">
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4 hidden-sm-only" align="right">
                <v-icon class="display-2">mdi-truck</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">FREE SHIPPING & RETURN</h3>
                <p class="font-weight-thin">Free Shipping over $300</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-cash-usd</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">MONEY BACK GUARANTEE</h3>
                <p class="font-weight-thin">30 Days Money Back Guarantee</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-headset</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">020-800-456-747</h3>
                <p class="font-weight-thin">24/7 Available Support</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { getProductById, getLikeProducts } from '@/api/shop';
import likeProducts from '@/components/shop/likeProducts.vue';
import description from '@/components/shop/description.vue';
import qa from '@/components/shop/qa.vue';
import review from '@/components/shop/review.vue';

export default {
  components: {
    likeProducts,
    description,
    qa,
    review,
  },
  data() {
    return {
      rating: 4.5,
      breadcrums: [
        {
          text: 'Home',
          disabled: false,
          href: 'breadcrumbs_home',
        },
        {
          text: 'Clothing',
          disabled: false,
          href: 'breadcrumbs_clothing',
        },
        {
          text: 'T-Shirts',
          disabled: true,
          href: 'breadcrumbs_shirts',
        },
      ],
      item: 5,
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Lorem ipsum dolor?',
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Tincidunt arcu non sodales neque sodales ut etiam. Lectus arcu bibendum at varius vel pharetra. Morbi tristique senectus et netus et malesuada.\n" +
            '\n',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title:
            'Lorem ipsum dolor <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Lorem ipsum dolor',
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Lorem ipsum dolor',
          subtitle: '',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Lorem ipsum dolor',
          subtitle:
            "<span class='text--primary'>Britta Holt</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
      ],
      product: '',
      product_detail: '',
      product_price: '',
      likeProducts: '',
      img: '',
      imgWidth: '200px',
      imgStyle: { width: '200px', height: 'auto', 'margin-left': '140px' },
      product_id: this.$route.params.id,
    };
  },
  methods: {
    async getProduct() {
      try {
        const id = this.product_id;
        const { data } = await getProductById({ id });

        this.productSetting(data);
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getLikeProducts() {
      try {
        const { data } = await getLikeProducts();
        this.likeProducts = data.Products;
      } catch (error) {
        console.log(error.response.data);
      }
    },

    productSetting(data) {
      this.product = data.product[0];
      this.product_detail = data.product[1];
      const product_price = this.product.price;
      this.product_price =
        this.$options.filters.numberWithCommas(product_price);
      this.img = require(`../../assets/img/shop/${this.product.product_type}/${this.product.img}.png`);
      this.imgHeightSetting();
    },

    imgHeightSetting() {
      if (this.product.product_type == 'board') {
        this.imgStyle.width = '200px';
      } else if (this.product.product_type == 'helmet') {
        this.imgStyle.width = '350px';
        this.imgStyle['margin-left'] = '50px';
      }
    },
  },

  created() {
    this.getProduct();
    this.getLikeProducts();
  },
};
</script>
