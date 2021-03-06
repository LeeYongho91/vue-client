// 로그인, 회원 가입, (ex) 회원 탈퇴
import { instance } from './index';

// 회원가입 API
function registerUser(userData) {
  return instance.post('signup', userData);
}

// 로그인 API
function loginUser(userData) {
  return instance.post('login', userData);
}

// 이메일 중복확인 API
function emailDoubleCheck(email) {
  return instance.post('emailDoubleCheck', email);
}

// 닉네임 중복확인 API
function nicknameDoubleCheck(nickname) {
  return instance.post('nicknameDoubleCheck', nickname);
}

// 회원정보 수정 API
function accountUpdate(userData) {
  return instance.post('accountUpdate', userData);
}

// 회원탈퇴 API
function userWithdraw(uuid) {
  return instance.post('userWithdraw', uuid);
}

export {
  registerUser,
  loginUser,
  emailDoubleCheck,
  nicknameDoubleCheck,
  accountUpdate,
  userWithdraw,
};
