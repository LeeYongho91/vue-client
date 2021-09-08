<template>
  <div>
    <v-list-item v-for="(review, index) in reviewList" :key="index">
      <v-list-item-content>
        <v-list-item-title v-html="review.title"></v-list-item-title
        ><v-rating
          v-model="review.star"
          class=""
          background-color="warning lighten-3"
          color="warning"
          dense
        ></v-rating>
        <v-list-item-subtitle v-html="review.content"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-pagination
      v-model="page"
      :length="length"
      :total-visible="totalVisible"
      @input="pageMove"
    ></v-pagination>
    <div align="right">
      <v-btn @click="write" class="primary mb-2">작성하기</v-btn>
    </div>
    <reviewWrite :dialog="dialog" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import { getReview } from '@/api/shop';
import reviewWrite from '@/components/shop/reviewWrite.vue';

export default {
  components: {
    reviewWrite,
  },
  props: {
    product_id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      page: 1,
      list: 10,

      totalCount: 0,
      totalVisible: 10,

      reviewList: [],
    };
  },

  methods: {
    write() {
      this.dialog = true;
    },
    closeDialog(value) {
      this.dialog = value;
    },

    async getReview() {
      try {
        const id = this.product_id;
        const page = this.page;
        const list = this.list;
        const { data } = await getReview({ id, page, list });
        console.log(data);
        this.reviewList = data.reviewList;
        this.totalCount = data.count;
      } catch (error) {
        console.log(error.response.data);
      }
    },
    pageMove(page) {
      this.page = page;
      this.getReview();
    },
  },

  computed: {
    length() {
      return Math.ceil(this.totalCount / this.list);
    },
  },
  created() {
    this.getReview();
  },
};
</script>

<style></style>
