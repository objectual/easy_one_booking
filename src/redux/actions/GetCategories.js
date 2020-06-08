// @flow

import { GET_CATEGORIES, LOGOUT } from "./ActionTypes";

export function request(payload) {
  return {
    payload,
    type: GET_CATEGORIES.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: GET_CATEGORIES.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GET_CATEGORIES.FAILURE
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
