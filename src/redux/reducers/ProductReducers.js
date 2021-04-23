import Actions, {_onUnmount, _onFail, _onSuccess} from '../actions';

const initialState = {
  data: [],
};
export const product = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_PRODUCT: {
      return {...state};
    }
    case _onSuccess(Actions.GET_PRODUCT): {
      return {...state, data: action.data};
    }
    case _onFail(Actions.GET_PRODUCT): {
      return {...state};
    }
    case _onUnmount(Actions.GET_PRODUCT): {
      return {...initialState};
    }
    default:
      return state;
  }
};
export const ProductReducer = {product};
