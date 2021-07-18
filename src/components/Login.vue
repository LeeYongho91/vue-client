<template>
  <v-container fill-height>
    <v-row class="justify-center align-center">
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar class="primary">
            <div class="login-toolbar">
              <v-toolbar-title>LOGIN</v-toolbar-title>
            </div>
          </v-toolbar>

          <v-card-text>
            <v-form v-model="valid" @submit.prevent="submitForm">
              <v-text-field
                prepend-icon="person"
                v-model="email"
                :rules="emailRules"
                label="Email"
                type="text"
                :name="Math.random()"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                v-model="password"
                :rules="passwordRules"
                label="password"
                type="password"
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                rounded
                large
                block
                type="submit"
                class="primary login-btn"
                >Sign in</v-btn
              >

              <v-btn
                class="google-btn"
                rounded
                large
                block
                style="background-color: whtie"
                @click="snsLogin('google')"
              >
                <img
                  src="@/assets/img/login_btn/google_icon.png"
                  alt=""
                  style="width: 20px; height: auto; margin-right: 10px"
                />
                구글로 로그인</v-btn
              >

              <v-btn
                class="naver-btn"
                rounded
                large
                block
                style="background-color: #02c65a"
                @click="snsLogin('naver')"
              >
                <img
                  src="@/assets/img/login_btn/naver_icon.png"
                  alt=""
                  style="width: 30px; height: auto"
                />
                네이버로 로그인</v-btn
              >

              <v-btn
                class="kakao-btn"
                rounded
                large
                block
                style="background-color: #fee500"
                @click="snsLogin('kakao')"
              >
                <img
                  src="@/assets/img/login_btn/kakao_icon.png"
                  alt=""
                  style="width: 15px; height: auto; margin-right: 10px"
                />
                카카오로 로그인</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,

      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [v => !!v || 'password is required'],
    };
  },

  computed: {
    validReturn() {
      return this.emailRules;
    },
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const userData = {
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch('LOGIN', userData);
        this.$router.push('/');
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error.response.data);
      } finally {
        this.initForm();
      }
    },

    async snsLogin(loginType) {
      try {
        location.href = `${process.env.VUE_APP_API_URL}auth/${loginType}`;
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error.response.data);
      } finally {
        this.initForm();
      }
    },

    initForm() {
      this.email = '';
      this.password = '';
    },
  },
};
</script>

<style scoped>
.login-toolbar {
  text-align: center;
  margin: auto;
  color: white;
}

.google-btn {
  text-align: center;
  color: black;
  margin-top: 10px;
}

.naver-btn {
  text-align: center;
  color: white;
  margin-top: 10px;
}

.kakao-btn {
  text-align: center;
  color: black;
  margin-top: 10px;
}
</style>
