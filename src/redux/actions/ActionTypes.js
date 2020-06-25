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
export const GET_CATEGORIES = createRequestTypes('GET_CATEGORIES');
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
export const LOGOUT = 'LOGOUT';

export const DRAWAR_MENU_SWITCHED = 'DRAWAR_MENU_SWITCHED';
export const STACK_NAVIGATOR = 'STACK_NAVIGATOR';
export const ADD_TO_CART = 'ADD_CART';
export const REMOVE__FROM_CART = 'REMOVE_CART';
