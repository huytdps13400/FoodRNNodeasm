import axios from 'axios';
const urlgetProduct = 'http://10.0.2.2:3010/product/all-product-send';
const urlgetCategory = 'http://10.0.2.2:3010/category/all-category-send';
const urladdUsers = 'http://10.0.2.2:3010/users/add-users';
const urlgetUsers = 'http://10.0.2.2:3010/users/all-users-send';
const urladdCart = 'http://10.0.2.2:3010/cart/add-cart';
// getProduct
function* getProductFromApi() {
  let product = [];
  yield axios
    .get(urlgetProduct)
    .then((response) => {
      console.log('data----', response.data);
      console.log(response.status);
      if (response.status === 200) {
        product = response.data;
      } else {
        product = [];
      }
    })
    .catch((error) => console.error(error));
  // tra ve product da get api
  return product;
}
function* getCategoryFromApi() {
  let category = [];
  yield axios
    .get(urlgetCategory)
    .then((response) => {
      console.log('data Category----', response.data);
      console.log(response.status);
      if (response.status === 200) {
        category = response.data;
      } else {
        category = [];
      }
    })
    .catch((error) => console.error(error));
  // tra ve product da get api
  return category;
}
function* AddUsersFromApi(users) {
  let datausers = {
    email: users.email,
    name: users.name,
    password: users.password,
  };
  const sendUsers = yield axios
    .post(urladdUsers, datausers)
    .then((response) => {
      console.log('data----', response.data);
      console.log(response.status);
    })
    .catch((error) => console.error(error));

  return yield sendUsers.result == 'ok';
}
function* getUsersFromApi() {
  let users = [];
  yield axios
    .get(urlgetUsers)
    .then((response) => {
      console.log('data Users----', response.data);
      console.log(response.status);
      if (response.status === 200) {
        users = response.data;
      } else {
        users = [];
      }
    })
    .catch((error) => console.error(error));
  // tra ve product da get api
  return users;
}
function* AddCartFromApi(cart) {
  let dataucart = {
    foodbill: cart.foodbill,
    totalprice: cart.totalprice,
    _idUser: cart._idUser,
    published: cart.published,
  };
  const sendCart = yield axios
    .post(urladdCart, dataucart)
    .then((response) => {
      console.log('data----', response.data);
      console.log(response.status);
    })
    .catch((error) => console.error(error));

  return yield sendCart.result == 'ok';
}
export const Api = {
  getProductFromApi,
  getCategoryFromApi,
  AddUsersFromApi,
  getUsersFromApi,
  AddCartFromApi,
};
