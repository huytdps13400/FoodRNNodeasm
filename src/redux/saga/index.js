import {all, fork} from 'redux-saga/effects';
import {watchProductSagas} from './ProductSaga';
import {watchCategorySagas} from './CategorySaga';
import {watchUsersSagas} from './UserSaga';
import {watchGETUsersSagas} from './UserSaga';
import {watchCartSagas} from './CartSaga';

export default function* rootSaga() {
  yield all([
    fork(watchProductSagas),
    fork(watchCategorySagas),
    fork(watchUsersSagas),
    fork(watchGETUsersSagas),
    fork(watchCartSagas),
  ]);
}
