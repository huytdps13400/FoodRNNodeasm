import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';
import {Api} from './api';

// getProduct
function* fetchProduct() {
  try {
    const res = yield Api.getProductFromApi();
    yield put({type: _onSuccess(Actions.GET_PRODUCT), data: res});
  } catch (error) {
    yield put({type: _onFail(Actions.GET_PRODUCT)});
  }
}
export function* watchProductSagas() {
  yield takeLatest(Actions.GET_PRODUCT, fetchProduct);
}
