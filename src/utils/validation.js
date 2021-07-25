export const nicknameRules = [
  v => !!v || '닉네임은 필수입니다.',
  v => (v && v.length <= 8) || '닉네임은 8글자 이하입니다.',
];

export const emailRules = [
  v => !!v || '이메일은 필수입니다.',
  v => /.+@.+\..+/.test(v) || '이메일 형식에 맞지 않습니다.',
];

export const passwordRules = [
  v => !!v || '비밀번호는 필수입니다.',
  v =>
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/.test(v) ||
    '비밀번호는 8 ~ 12자 이며, 숫자/영문/특수문자를 모두 포함해야 합니다.',
];

export function passwordCheckRules(self) {
  return [
    v => !!v || '비밀번호 확인은 필수입니다',
    v =>
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/.test(v) ||
      '비밀번호는 8 ~ 12자 이며, 숫자/영문/특수문자를 모두 포함해야 합니다.',
    v =>
      v === self.password || '비밀번호가 일치하지 않습니다 다시 입력해주세요.',
  ];
}

export const phoneNumberRules = [
  v => !!v || '휴대폰번호는 필수입니다.',
  v =>
    /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/.test(v) ||
    '휴대폰번호 형식에 맞지 않습니다.',
];
