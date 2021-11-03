import {Reducer} from 'react';
import {ICartState} from './types';
import produce from 'immer';

const INITIAL_STATE: ICartState = {
  items: [],
};

const cart: Reducer<ICartState, any> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_PRODUCT_SUCCESS': {
        const {product} = action.payload;

        const index = draft.items.findIndex(i => i.product.id === product.id);

        if (index >= 0) {
          draft.items[index].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;
      }

      default: {
        return draft;
      }
    }
  });
};

export default cart;
