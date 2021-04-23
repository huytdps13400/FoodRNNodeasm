import Actions, {_onUnmount, _onFail, _onSuccess} from '../actions';

const initialState = {
  data: [],
};
export const adduser = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_CART: {
      return {...state};
    }
    case _onSuccess(Actions.ADD_CART): {
      return {...state, data: action.data};
    }
    case _onFail(Actions.ADD_CART): {
      return {...state};
    }
    case _onUnmount(Actions.ADD_CART): {
      return {...initialState};
    }
    default:
      return state;
  }
};
// export const user = (state = initialState, action) => {
//   switch (action.type) {
//     case Actions.GET_USER: {
//       return {...state};
//     }
//     case _onSuccess(Actions.GET_USER): {
//       return {...state, data: action.data};
//     }
//     case _onFail(Actions.GET_USER): {
//       return {...state};
//     }
//     case _onUnmount(Actions.GET_USER): {
//       return {...initialState};
//     }
//     default:
//       return state;
//   }
// };
export const CartReducers = {adduser};
