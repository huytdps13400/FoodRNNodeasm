import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';
import {Api} from './api';

// getProduct
function* addCart(action) {
  try {
    const res = yield Api.AddCartFromApi(action.datacart);

    yield put({type: _onSuccess(Actions.ADD_CART), data: res});
  } catch (error) {
    yield put({type: _onFail(Actions.ADD_CART)});
  }
}
function* getUsers() {
  try {
    const res = yield Api.getUsersFromApi();

    yield put({type: _onSuccess(Actions.GET_USER), data: res});
  } catch (error) {
    yield put({type: _onFail(Actions.GET_USER)});
  }
}
export function* watchGETUsersSagas() {
  yield takeLatest(Actions.GET_USER, getUsers);
}
export function* watchCartSagas() {
  yield takeLatest(Actions.ADD_CART, addCart);
}
