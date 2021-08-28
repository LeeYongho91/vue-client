import { shop } from './index';

// 타입별 상품 가져오기 API
function getProduct(params) {
  return shop.get(params);
}

//  해당상품 가져오기 API
function getProductById(id) {
  return shop.post('/detail', id);
}

export { getProduct, getProductById };
