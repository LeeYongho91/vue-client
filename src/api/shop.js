import { shop } from './index';

// 타입별 상품 가져오기 API
function getProduct(type) {
  return shop.get(type);
}

export { getProduct };
