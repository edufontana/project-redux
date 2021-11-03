import {all, takeLatest, select, call, put} from 'redux-saga/effects';
import {IState} from '../..';
import api from '../../../services/api';
import {AddProductToCartRequest, AddProductToCartSuccess} from './actions';

type checkProductStockRequest = ReturnType<typeof AddProductToCartRequest>;

function* checkProductStock({payload}: checkProductStockRequest) {
  const {product} = payload;

  const currentQuantity: number = yield select((state: IState) => {
    return (
      state.cart.items.find(item => item.product.id === product.id)?.quantity ??
      0
    );
  });

  const availableStockResponse = yield call(api.get, `stock/${product.id}`);

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(AddProductToCartSuccess(product));
    console.log('deu certo');
  } else {
    console.log('falta');
  }
}

export default all([takeLatest('ADD_PRODUCT_REQUEST', checkProductStock)]);
