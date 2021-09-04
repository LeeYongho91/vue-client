// -------------필터 관련 함수가 존재하는 파일-------------

// 날짜 포맷
export function formatDate(value) {
  const date = new Date(value);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;
  let day = date.getDate();
  day = day > 9 ? day : `0${day}`;
  let hours = date.getHours();
  hours = hours > 9 ? hours : `0${hours}`;
  let minutes = date.getMinutes();
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  let second = date.getSeconds();
  second = second > 9 ? second : `0${second}`;
  return `${year}-${month}-${day} ${hours}:${minutes}:${second}`;
}
// 숫자 세자리수 콤마
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
