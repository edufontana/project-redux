import {createStore, applyMiddleware} from 'redux';
import {ICartState} from './modules/cart/types';
import rootReducer from './modules/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSagas';

export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const midlewares = [sagaMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...midlewares)),
);

sagaMiddleware.run(rootSaga);

export default store;
