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
                color=""
                class="mb-1"
                @click="emailDoubleCheck"
                :disabled="test"
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
          <v-text-field
            label="휴대폰"
            required
            v-model="phoneNumber"
            :rules="phoneNumberRules"
            autocomplete="off"
          >
            <template v-slot:append>
              <v-btn depressed color="" class="mb-1"> 인증번호받기 </v-btn>
            </template>
          </v-text-field>
          <v-btn
            :disabled="!valid || emailValid || nicknameValid"
            color="primary"
            class="col-12"
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
} from '@/utils/validation';
import Bus from '@/utils/Bus';

export default {
  data() {
    return {
      valid: true,

      nickname: '',
      nicknameValid: true,
      nicknameRules,
      nicknameDoubleCheckValid: true,

      email: '',
      emailValid: true,
      emailRules,
      emailDoubleCheckValid: true,

      password: '',
      passwordRules,

      passwordCheck: '',
      passwordCheckRules: passwordCheckRules(this),

      phoneNumber: '',
      phoneNumberRules,
    };
  },

  methods: {
    emailDoubleCheck() {
      this.emailDoubleCheckValid = false;
      Bus.$emit('normalAlert', '사용가능한 이메일입니다.');
    },
    nicknameDoubleCheck() {
      this.nicknameDoubleCheckValid = false;
    },
  },

  computed: {
    test() {
      return !/.+@.+\..+/.test(this.email);
    },
  },
};
</script>

<style></style>
