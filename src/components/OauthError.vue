<template>
  <div></div>
</template>
<script>
export default {
  created() {
    alert('Email 그리고 nickname은 필수사항입니다.');
    location.href =
      'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=levL_eG6gNo8OdTcODV5&state=302&redirect_uri=http://localhost:3000/auth/naver/callback&auth_type=reprompt';
  },
};
</script>

<style scoped></style>
