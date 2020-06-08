// @flow

import { GET_SALOON, LOGOUT } from "./ActionTypes";

export function request(payload) {
  return {
    payload,
    type: GET_SALOON.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: GET_SALOON.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GET_SALOON.FAILURE
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
