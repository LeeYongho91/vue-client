import { shop } from './index';

// 상품 가져오기 API
function getProduct(type) {
  return shop.get('/get', type);
}

export { getProduct };
