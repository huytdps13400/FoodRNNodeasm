import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';
import {Api} from './api';

// getCategory
function* fetchCategory() {
  try {
    const res = yield Api.getCategoryFromApi();
    yield put({type: _onSuccess(Actions.GET_CATEGORY), data: res});
  } catch (error) {
    yield put({type: _onFail(Actions.GET_CATEGORY)});
  }
}
export function* watchCategorySagas() {
  yield takeLatest(Actions.GET_CATEGORY, fetchCategory);
}
