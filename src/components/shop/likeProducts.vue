<template>
  <div class="col-md-3 col-sm-4 col-xs-12 text-center" style="cursor: pointer">
    <v-hover v-slot:default="{ hover }" open-delay="200">
      <v-card :elevation="hover ? 16 : 2">
        <v-img
          class="white--text align-end"
          height="380px"
          width="auto"
          :src="
            require(`../../assets/img/shop/${product.product_type}/${product.img}.png`)
          "
        >
        </v-img>

        <v-card-text class="text--primary text-center" style="height: 120px">
          <div>{{ product.name }}</div>
          <div>{{ product.price }}원</div>
        </v-card-text>

        <div class="text-center">
          <v-btn class="ma-2" outlined color="info"> Explore </v-btn>
        </div>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
