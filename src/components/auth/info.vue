<template>
  <!-- <div
    class="row justify-center align-center"
    style="position: relative; top: 20%"
  >
    <div class="col-md-5">
      <v-form ref="form" v-model="valid">
        <v-text-field readonly value="wqfasds"></v-text-field>
        <v-text-field
          v-model="nickname"
          :rules="nicknameRules"
          label="닉네임"
          required
          autocomplete="off"
        >
          <template v-slot:append>
            <v-btn depressed color="" class="mb-1"> 변경하기 </v-btn>
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
        >
          회원정보수정
        </v-btn>
      </v-form>
    </div>
  </div> -->

  <v-container style="position: relative; left: 20%; top: 20%">
    <v-row>
      <v-col cols="2" class="pt-5">
        <v-subheader>이메일</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field value="skyks5050@naver.com" readonly></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2" class="pt-5">
        <v-subheader>닉네임</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field value="28.00"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2" class="pt-5">
        <v-subheader>비밀번호</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field value="example"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2" class="pt-5">
        <v-subheader>비밀번호 확인</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field value="example"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2"> </v-col>
      <v-col cols="4" align="right"> <v-btn>회원정보수정</v-btn></v-col>
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
};
</script>

<style></style>
