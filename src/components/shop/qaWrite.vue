<template>
  <div class="text-center">
    <v-dialog v-model="isDialogShow" width="500">
      <v-card>
        <v-card-title class="text-h5 primary white--text"> Q/A </v-card-title>

        <v-card-text>
          <v-container fluid>
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="title"
                    label="제목"
                    filled
                    :rules="qaTitleRules"
                    ref="title"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    name="input-7-1"
                    filled
                    label="내용"
                    auto-grow
                    v-model="content"
                    :rules="qaContentRules"
                    ref="content"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <p>비밀글설정</p>
                  <v-radio-group row v-model="active">
                    <v-radio
                      label="공개글"
                      :value="true"
                      name="active"
                    ></v-radio>
                    <v-radio
                      label="비밀글"
                      :value="false"
                      name="active"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" v-if="!active">
                  <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    name="input-10-1"
                    label="비밀번호"
                    counter
                    @click:append="show = !show"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="qaWrite" :disabled="!valid"
            >등록</v-btn
          >
          <v-btn class="error" text @click="closeDialog"> 닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { postQa } from '@/api/shop';
// import Bus from '@/utils/Bus';

import { qaTitleRules, qaContentRules } from '@/utils/validation';

export default {
  data() {
    return {
      valid: true,

      show: false,
      title: '',
      content: '',
      password: '',
      active: true,

      qaTitleRules,
      qaContentRules,
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
      this.dialogReset();
    },
    dialogReset() {
      this.$refs.title.reset();
      this.$refs.content.reset();
    },
    async qaWrite() {
      try {
        const product_id = this.$route.params.id;
        const nickname = this.$store.getters.getUser.nickname;
        const title = this.title;
        const content = this.content;
        const public_flag = this.active;
        const password = this.password;
        const answer_flag = false;
        const params = {
          product_id,
          nickname,
          title,
          content,
          public_flag,
          password,
          answer_flag,
        };
        const { data } = await postQa(params);
        if (data) {
          //Bus.$emit('normalAlert', '등록이 완료되었습니다');
          this.closeDialog();
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
    isModalType() {
      return this.modalType;
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
