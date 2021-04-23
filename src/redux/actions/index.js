export default {
  GET_PRODUCT: 'GET_PRODUCT',
  GET_CATEGORY: 'GET_CATEGORY',
  ADD_USER: 'ADD_USER',
  GET_USER: 'GET_USER',
  ADD_CART: 'ADD_CART',
};

export function _onSuccess(action) {
  return action + '_SUCCESS';
}
export function _onFail(action) {
  return action + '_FAIL';
}
export function _onUnmount(action) {
  return action + '_UNMOUNT';
}
