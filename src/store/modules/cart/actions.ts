import {IProduct} from './types';

export function AddProductToCartRequest(product: IProduct) {
  return {
    type: 'ADD_PRODUCT_REQUEST',
    payload: {product},
  };
}

export function AddProductToCartSuccess(product: IProduct) {
  return {
    type: 'ADD_PRODUCT_SUCCESS',
    payload: {product},
  };
}

export function AddProductToCartFailure(productId: number) {
  return {
    type: 'ADD_PRODUCT_FAILURE',
    payload: {productId},
  };
}
