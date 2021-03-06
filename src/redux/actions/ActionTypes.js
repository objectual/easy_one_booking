// @flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const CANCEL = 'CANCEL';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach((type) => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const LOGIN = createRequestTypes('LOGIN');
export const REGISTER = createRequestTypes('REGISTER');
export const FORGOT_PASSWORD = createRequestTypes('FORGOT_PASSWORD');
export const VERIFY_RESET_CODE = createRequestTypes('VERIFY_RESET_CODE');
export const RESET_PASSWORD = createRequestTypes('RESET_PASSWORD');
export const SOCIAL_LOGIN = createRequestTypes('SOCIAL_LOGIN');
export const GET_SALOON = createRequestTypes('GET_SALOON');
export const GET_BOOKING = createRequestTypes('GET_BOOKING');
export const GET_SALOON_NEARBY = createRequestTypes('GET_SALOON_NEARBY');
export const GET_CATEGORIES = createRequestTypes('GET_CATEGORIES');
export const CUSTOMER_RATING = createRequestTypes('CUSTOMER_RATING');
export const EMPLOYEE_RATING = createRequestTypes('EMPLOYEE_RATING');
export const FORGET_PASSWORD = createRequestTypes('FORGET_PASSWORD');
export const OTP = createRequestTypes('OTP');

export const GET_SALOON_CATEGORIES = createRequestTypes(
  'GET_SALOON_CATEGORIES',
);
export const GET_SALOON_SERVICES_BY_CATEGORY = createRequestTypes(
  'GET_SALOON_SERVICES_BY_CATEGORY',
);
export const GET_SALOON_BY_CATEGORY = createRequestTypes(
  'GET_SALOON_BY_CATEGORY',
);
export const CREATE_BOOKING = createRequestTypes('CREATE_BOOKING');
export const GET_EMPLOYEES_BY_SALOON_AND_CATEGORY = createRequestTypes(
  'GET_EMPLOYEES_BY_SALOON_AND_CATEGORY',
);
export const GET_SERVICES = createRequestTypes('GET_SERVICES');
export const UPDATE_BOOKING = createRequestTypes('UPDATE_BOOKING');
export const GETWALLET = createRequestTypes('GETWALLET');
//

export const LOGOUT = 'LOGOUT';

export const DRAWAR_MENU_SWITCHED = 'DRAWAR_MENU_SWITCHED';
export const STACK_NAVIGATOR = 'STACK_NAVIGATOR';
export const ADD_TO_CART = 'ADD_CART';
export const REMOVE__FROM_CART = 'REMOVE_CART';
export const HIDE_MODAL = 'HIDE_MODAL';
export const REMOVE_ALL = 'REMOVE_ALL';
