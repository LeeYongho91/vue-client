<template>
  <tr>
    <td>
      <v-list-item :key="pro.seq">
        <v-list-item-avatar>
          <v-img
            :src="
              require(`../../assets/img/shop/${pro.product_type}/${pro.img}.png`)
            "
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ pro.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </td>
    <td>{{ pro.price | numberWithCommas }} 원</td>
    <td>
      <v-text-field
        class="pt-10"
        label="Outlined"
        style="width: 80px"
        single-line
        outlined
        :value="count"
        v-model="count"
        type="number"
        ref="inputRef"
        min="1"
      ></v-text-field>
    </td>
    <td>{{ totalPrice | numberWithCommas }}원</td>
    <td><v-btn class="error" @click="cartDelete">삭제</v-btn></td>
  </tr>
</template>

<script>
//import Bus from '@/utils/Bus';

export default {
  props: {
    pro: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      count: this.pro.count,
      test: '',
    };
  },

  methods: {
    cartDelete() {
      localStorage.removeItem(this.pro.seq);
      this.$emit('cartRefresh', this.pro.seq);
    },
    countCheck() {
      return true;
    },
  },

  computed: {
    totalPrice() {
      return this.pro.price * this.count;
    },
  },

  watch: {
    count() {
      this.$emit('countChange', {
        id: this.pro.seq,
        count: this.count,
      });
    },
  },

  created() {},
};
</script>

<style></style>
