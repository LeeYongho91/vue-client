<template>
  <div class="row justify-center">
    <div>
      <img
        :src="require('../../assets/img/shop/detail/detail_1.png')"
        alt=""
        height="600px"
        width="auto"
      />
    </div>
    <div>
      <img :src="img" alt="" height="800px" width="auto" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
