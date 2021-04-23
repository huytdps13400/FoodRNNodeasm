import {put, takeLatest} from 'redux-saga/effects';
import Actions, {_onFail, _onSuccess} from '../actions';
import {Api} from './api';

// getProduct
function* addUsers(action) {
  try {
    const res = yield Api.AddUsersFromApi(action.datauser);

    yield put({type: _onSuccess(Actions.ADD_USER), data: res});
  } catch (error) {
    yield put({type: _onFail(Actions.ADD_USER)});
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
export function* watchUsersSagas() {
  yield takeLatest(Actions.ADD_USER, addUsers);
}
