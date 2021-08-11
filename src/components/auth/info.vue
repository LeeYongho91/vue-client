<template>
  <v-row>
    <v-col cols="10">
      <v-breadcrumbs :items="items" divider="-"></v-breadcrumbs>
      <v-divider></v-divider>
      <v-container class="mt-5">
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="2" class="pt-5">
              <v-subheader>이메일</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field :value="email" readonly></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2" class="" style="padding-top: 30px">
              <v-subheader>닉네임</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field
                :value="nickname"
                v-model="nickname"
                :rules="nicknameRules"
              >
                <template v-slot:append>
                  <v-btn
                    depressed
                    color=""
                    class="mb-1"
                    @click="nicknameDoubleCheck"
                    :disabled="nicknameDoubleAble"
                  >
                    중복확인
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2" class="pt-5">
              <v-subheader>비밀번호</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field
                value=""
                v-model="password"
                :rules="passwordRules"
                required
                type="password"
                autocomplete="off"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2" class="pt-5">
              <v-subheader>비밀번호 확인</v-subheader>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="passwordCheck"
                :rules="passwordCheckRules"
                required
                type="password"
                autocomplete="off"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2"> </v-col>
            <v-col cols="4" align="right">
              <v-btn class="error mr-5" @click="withDraw">탈퇴</v-btn>
              <v-btn
                class="primary"
                :disabled="!valid || nicknameValid"
                @click="accountUpdate"
                >회원정보수정</v-btn
              ></v-col
            >
          </v-row>
        </v-form>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import {
  nicknameRules,
  passwordRules,
  passwordCheckRules,
  phoneNumberRules,
} from '@/utils/validation';
import Bus from '@/utils/Bus';
import { nicknameDoubleCheck, accountUpdate, userWithdraw } from '@/api/auth';
import { deleteCookie, saveUserToCookie } from '@/utils/cookies';

export default {
  data() {
    return {
      valid: true,

      nickname: '',
      nicknameValid: true,
      nicknameRules,

      email: '',

      password: '',
      passwordRules,

      passwordCheck: '',
      passwordCheckRules: passwordCheckRules(this),

      phoneNumber: '',
      phoneNumberRules,

      doubleCheckColor: 'white',

      uuid: '',

      items: [
        {
          text: '내 계정',
          disabled: true,
          href: '',
        },
        {
          text: '회원 정보',
          disabled: false,
          href: '',
        },
      ],
    };
  },
  computed: {
    nicknameDoubleAble() {
      return !(
        this.nickname &&
        this.nickname.length >= 4 &&
        this.nickname.length <= 8
      );
    },
  },
  methods: {
    async nicknameDoubleCheck() {
      const nickname = this.nickname;
      try {
        const { data } = await nicknameDoubleCheck({ nickname });
        if (data.result == 'SUCCESS') {
          this.nicknameValid = false;
          Bus.$emit('normalAlert', '사용가능한 닉네임입니다.');
        } else {
          Bus.$emit('errorAlert', '이미 사용중인 닉네임입니다.');
        }
      } catch (error) {
        console.log(error.response.data);
      }
    },

    userInfoSetting() {
      const user = this.$store.getters.getUser;
      this.email = user.email;
      this.nickname = user.nickname;
      this.uuid = user.uuid;
    },

    async withDraw() {
      const uuid = this.uuid;
      try {
        const { data } = await userWithdraw({ uuid });
        if (data.result == 'SUCCESS') {
          this.$store.commit('clearUser');
          deleteCookie('til_user');
          Bus.$emit('redirectAlert', '탈퇴가 완료되었습니다.', '/');
        } else {
          Bus.$emit('errorAlert', '오류가 발생하였습니다.');
        }
      } catch (error) {
        console.log(error.response.data);
      }
    },

    async accountUpdate() {
      const nickname = this.nickname;
      const uuid = this.uuid;
      const email = this.email;
      const password = this.password;
      try {
        const { data } = await accountUpdate({ uuid, nickname, password });
        if (data.result == 'SUCCESS') {
          this.$store.commit('clearUser');
          deleteCookie('til_user');
          const user = { uuid, nickname, email };
          this.$store.commit('setUser', JSON.stringify(user));
          saveUserToCookie(JSON.stringify(user));
          Bus.$emit('redirectAlert', '회원정보가 변경되었습니다.', '/');
        } else {
          Bus.$emit('errorAlert', '오류가 발생하였습니다.');
        }
      } catch (error) {
        console.log(error.response.data);
      }
    },

    pswInit() {
      this.password = '';
      this.passwordCheck = '';
    },
  },
  created() {
    this.userInfoSetting();
    //deleteCookie('til_user');
  },
};
</script>
<style></style>
