import { shop } from './index';

// 타입별 상품 가져오기 API
function getProduct(params) {
  return shop.get(params);
}

//  해당상품 가져오기 API
function getProductById(id) {
  return shop.post('/detail', id);
}

//  관심상품 가져오기 API
function getLikeProducts() {
  return shop.post('/LikeProducts');
}

//  Q/A 등록하기 API
function postQa(params) {
  return shop.post('/qa/post', params);
}

//  Q/A 리스트 가져오기 API
function getQa(id) {
  return shop.post('/qa', id);
}

// review 리스트 가져오기 API
function getReview(id) {
  return shop.post('/review', id);
}

//  REVIEW 등록하기 API
function postReview(params) {
  return shop.post('/review/post', params);
}

export {
  getProduct,
  getProductById,
  getLikeProducts,
  postQa,
  getQa,
  getReview,
  postReview,
};
