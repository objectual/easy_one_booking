// @flow

import { GET_SALOON_CATEGORIES, LOGOUT } from "./ActionTypes";

export function request(payload) {
  return {
    payload,
    type: GET_SALOON_CATEGORIES.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: GET_SALOON_CATEGORIES.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GET_SALOON_CATEGORIES.FAILURE
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
