// @flow

import { GET_SALOON_BY_CATEGORY, LOGOUT } from "./ActionTypes";

export function request(payload) {
  return {
    payload,
    type: GET_SALOON_BY_CATEGORY.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: GET_SALOON_BY_CATEGORY.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GET_SALOON_BY_CATEGORY.FAILURE
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
