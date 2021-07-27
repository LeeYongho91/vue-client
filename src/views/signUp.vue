<template>
  <v-container fill-height>
    <v-row class="justify-center align-center">
      <v-col class="col-12 text-h4" align="center">정보입력</v-col>
      <v-col class="col-5 mt-0">
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="이메일"
            required
            autocomplete="off"
          >
            <template v-slot:append>
              <v-btn
                depressed
                class="mb-1"
                @click="emailDoubleCheck"
                :disabled="emailDoubleAble"
              >
                중복확인
              </v-btn>
            </template></v-text-field
          >
          <v-text-field
            v-model="nickname"
            :rules="nicknameRules"
            label="닉네임"
            required
            autocomplete="off"
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
            </template></v-text-field
          >
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="비밀번호"
            required
            type="password"
            autocomplete="off"
          ></v-text-field>
          <v-text-field
            v-model="passwordCheck"
            :rules="passwordCheckRules"
            label="비밀번호 확인"
            required
            type="password"
            autocomplete="off"
          ></v-text-field>
          <v-btn
            :disabled="!valid || emailValid || nicknameValid"
            color="primary"
            class="col-12"
            @click="signUp"
          >
            가입완료
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  nicknameRules,
  emailRules,
  passwordRules,
  passwordCheckRules,
  phoneNumberRules,
  regEmail,
} from '@/utils/validation';
import Bus from '@/utils/Bus';
import { registerUser } from '@/api/auth';
export default {
  data() {
    return {
      valid: true,

      nickname: '',
      nicknameValid: true,
      nicknameRules,

      email: '',
      emailValid: true,
      emailRules,

      password: '',
      passwordRules,

      passwordCheck: '',
      passwordCheckRules: passwordCheckRules(this),

      phoneNumber: '',
      phoneNumberRules,

      doubleCheckColor: 'white',
    };
  },

  methods: {
    emailDoubleCheck() {
      this.emailValid = false;
      Bus.$emit('normalAlert', '사용가능한 이메일입니다.');
    },
    nicknameDoubleCheck() {
      this.nicknameValid = false;
      Bus.$emit('normalAlert', '사용가능한 닉네임입니다.');
      //this.$dialog.confirm('Do you want to proceed?');
    },
    async signUp() {
      const email = this.email;
      const nickname = this.nickname;
      const password = this.password;
      const userData = { email, nickname, password };
      const { data } = await registerUser(userData);
      if (data) {
        // Bus.$emit('normalAlert', '가입이 완료되었습니다.');
        // this.$router.push('/');
      }
    },
  },

  computed: {
    emailDoubleAble() {
      return !regEmail.test(this.email);
    },
    nicknameDoubleAble() {
      return !(
        this.nickname &&
        this.nickname.length >= 4 &&
        this.nickname.length <= 8
      );
    },
  },
  watch: {
    email: function () {
      this.emailValid = true;
    },
  },
};
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
  pointer-events: all !important;
  color: red;
}
</style>
