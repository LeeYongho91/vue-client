<template>
  <div>
    <v-container style="margin-bottom: 150px">
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
                  @countChange="countChange"
                />
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col :cols="12" md="3" sm="12" style="background-color: lightgray">
          <p class="headline">주문 요약</p>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>주문가격</td>
                  <td class="text-right" style="width: 120px">
                    {{ allTotalPrice | numberWithCommas }} 원
                  </td>
                </tr>
                <tr>
                  <td>배송비</td>
                  <td class="text-right" style="width: 120px">
                    {{ shipPrice | numberWithCommas }}원
                  </td>
                </tr>
                <tr>
                  <td>총 결제금액</td>
                  <td class="text-right" style="width: 120px">
                    {{ (allTotalPrice + shipPrice) | numberWithCommas }}
                    원
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center">
            <v-btn class="primary white--text mt-5" outlined>결제하기</v-btn>
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
      shipPrice: 5000,
    };
  },
  components: {
    CartProduct,
  },
  methods: {
    getCartList() {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key != 'loglevel:webpack-dev-server') {
          let product = localStorage.getItem(key);
          this.cartList.push(JSON.parse(product));
        }
      }
    },
    cartRefresh(id) {
      this.cartList = this.cartList.filter(el => el.seq !== id);
    },
    countChange(proInfo) {
      for (let i = 0; i <= this.cartList.length; i++) {
        if (proInfo.id == this.cartList[i].seq) {
          this.cartList[i].count = proInfo.count;
          break;
        }
      }
    },
  },
  computed: {
    allTotalPrice() {
      const result = this.cartList.reduce((acc, cur) => {
        return acc + cur.price * cur.count;
      }, 0);
      return result;
    },
  },

  created() {
    this.getCartList();
  },
};
</script>
