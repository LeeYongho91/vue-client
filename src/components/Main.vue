<template>
  <div>
    <v-carousel hide-delimiters class="mb-5">
      <v-carousel-item :src="require('@/assets/img/main/main_3.png')">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 white--text pl-5 pr-5 hidden-sm-only"></div>
          <br />
        </v-row>
      </v-carousel-item>
      <v-carousel-item :src="require('@/assets/img/main/main_2.png')">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 white--text pl-5 pr-5 hidden-sm-only"></div>
          <br />
        </v-row>
      </v-carousel-item>
      <v-carousel-item :src="require('@/assets/img/main/main_1.png')">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 white--text pl-5 pr-5 hidden-sm-only"></div>
          <br />
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <div class="pl-5 pr-5 row mb-5 align-center">
      <div class="col-md-1"></div>
      <div class="col-md-5 col-sm-6 col-xs-12">
        <v-card>
          <v-img
            class="white--text align-center sub-1"
            height="500px"
            width="auto"
          >
            <h1 class="text-center font-size">SkateBoard</h1>
            <div class="text-center">
              <v-btn href="/shop" class="white--text" outlined>SHOP NOW</v-btn>
            </div>

            <!--            <v-expand-transition>-->
            <!--              <div-->
            <!--                v-if="hover"-->
            <!--                class="d-flex transition-fast-in-fast-out orange darken-2 v-card&#45;&#45;reveal display-3 white&#45;&#45;text"-->
            <!--                style="height: 100%;"-->
            <!--              >-->

            <!--                <h3>Top Picks</h3><br/>-->
            <!--                <h3>sdfs</h3>-->
            <!--              </div>-->
            <!--            </v-expand-transition>-->
          </v-img>
        </v-card>
        <!--        </v-hover>-->
      </div>
      <div class="col-md-5 col-sm-6 col-xs-12">
        <v-card>
          <v-img
            class="white--text align-center sub-2"
            height="500px"
            width="auto"
          >
            <h1 class="text-center font-size">Clothes</h1>
            <div class="text-center">
              <v-btn href="/shop" class="white--text" outlined>SHOP NOW</v-btn>
            </div>
          </v-img>
        </v-card>
      </div>
    </div>

    <v-card class="accent">
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
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
import { deleteCookie } from '@/utils/cookies';

export default {
  data() {
    return {
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      activeBtn: 1,
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    };
  },
  methods: {},
  created() {
    const snsData = this.$cookies.get('snsData');
    if (snsData != null) {
      this.$store.dispatch('SNS_LOGIN', snsData);
      deleteCookie('snsData');
    }
  },
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

.sub-1 {
  background: url('../assets/img/main/main_5.png') no-repeat center;
}
.sub-2 {
  background: url('../assets/img/main/main_4.png') no-repeat center;
}
</style>
