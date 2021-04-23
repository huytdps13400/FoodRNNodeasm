import {combineReducers} from 'redux';
import {ProductReducer} from './ProductReducers';
import {CategoryReducers} from './CategoryReducers';
import {UserReducers} from './UserReducers';
import {CartReducers} from './CartReducers';

const rootReducer = combineReducers({
  ...ProductReducer,
  ...CategoryReducers,
  ...UserReducers,
  ...CartReducers,
});
export default rootReducer;
