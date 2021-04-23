import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../saga';

const SagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(SagaMiddleware));
SagaMiddleware.run(rootSaga);
export default store;
