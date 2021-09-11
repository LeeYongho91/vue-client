<template>
  <div>
    <v-container class="mb-12">
      <p class="display-3 font-weight-light text-center pa-4 pb-12">
        SHOPPING CART
      </p>
      <v-row>
        <v-col :cols="12" md="9" sm="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">ITEM</th>
                  <th class="text-center">PRICE</th>
                  <th class="text-center">QUANTITY</th>
                  <th class="text-center">TOTAL</th>
                  <th class="text-center">DELETE</th>
                </tr>
              </thead>
              <tbody>
                <CartProduct
                  v-for="pro in cartList"
                  :key="pro.seq"
                  :pro="pro"
                  @cartRefresh="cartRefresh"
                />
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col :cols="12" md="3" sm="12" style="background-color: lightgray">
          <p class="headline">Order Summary</p>
          <p class="overline">
            Shipping and additional costs are calculated based on values you
            have entered.
          </p>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>Order Subtotal</td>
                  <td class="text-right" style="width: 50px">$160.00</td>
                </tr>
                <tr>
                  <td>Shipping Charges</td>
                  <td class="text-right" style="width: 50px">$10.00</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td class="text-right" style="width: 50px">$5.00</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td class="text-right" style="width: 50px"><b>$175.00</b></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center">
            <v-btn class="primary white--text mt-5" outlined
              >PROCEED TO PAY</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import CartProduct from '@/components/shop/CartProduct.vue';
export default {
  data() {
    return {
      cartList: [],
    };
  },
  components: {
    CartProduct,
  },
  methods: {
    getCartList() {
      for (let i = 1; i <= localStorage.length; i++) {
        let product = localStorage.getItem(i);
        if (product !== null) {
          this.cartList.push(JSON.parse(product));
        }
      }
    },

    getTotalPrice(price, count) {
      return price * count;
    },

    cartRefresh(id) {
      this.cartList = this.cartList.filter(el => el.seq !== id);
    },
  },

  created() {
    this.getCartList();
    console.log(this.cartList);
  },
};
</script>
