import Actions, {_onUnmount, _onFail, _onSuccess} from '../actions';

const initialState = {
  data: [],
};
export const category = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_CATEGORY: {
      return {...state};
    }
    case _onSuccess(Actions.GET_CATEGORY): {
      return {...state, data: action.data};
    }
    case _onFail(Actions.GET_CATEGORY): {
      return {...state};
    }
    case _onUnmount(Actions.GET_CATEGORY): {
      return {...initialState};
    }
    default:
      return state;
  }
};
export const CategoryReducers = {category};
