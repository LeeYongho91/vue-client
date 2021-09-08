<template>
  <div class="text-center">
    <v-dialog v-model="isDialogShow" width="500">
      <v-card>
        <v-card-title class="text-h5 primary white--text">
          REVIEW
        </v-card-title>

        <v-card-text>
          <v-container fluid>
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="title"
                    label="제목"
                    filled
                    :rules="reviewTitleRules"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    name="input-7-1"
                    filled
                    label="내용"
                    auto-grow
                    v-model="content"
                    :rules="reviewContentRules"
                  ></v-textarea>
                </v-col>

                <v-col cols="2" class="">
                  <span style="padding-left: 3px; color: black">별점</span>
                </v-col>

                <v-col cols="10">
                  <v-rating
                    class=""
                    background-color="warning lighten-3"
                    color="warning"
                    dense
                    v-model="star"
                  ></v-rating>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="write" :disabled="!valid">등록</v-btn>
          <v-btn class="error" text @click="closeDialog"> 닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import Bus from '@/utils/Bus';
import { postReview } from '@/api/shop';
import { reviewTitleRules, reviewContentRules } from '@/utils/validation';

export default {
  data() {
    return {
      valid: true,

      show: false,
      title: '',
      content: '',
      password: '',
      active: true,
      star: 0,

      reviewTitleRules,
      reviewContentRules,
    };
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.isDialogShow = false;
      this.title = '';
      this.content = '';
      this.password = '';
    },
    async write() {
      try {
        const product_id = this.$route.params.id;
        const nickname = this.$store.getters.getUser.nickname;
        const title = this.title;
        const content = this.content;
        const star = this.star;
        const params = {
          product_id,
          nickname,
          title,
          content,
          star,
        };
        const { data } = await postReview(params);
        if (data) {
          //Bus.$emit('normalAlert', '등록이 완료되었습니다');
          this.closeDialog();
          console.log(this.star);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
  computed: {
    isDialogShow: {
      get() {
        return this.dialog;
      },
      set(value) {
        this.$emit('closeDialog', value);
      },
    },
  },
};
</script>

<style scpoed>
button:disabled {
  cursor: not-allowed;
  pointer-events: all !important;
}
</style>
