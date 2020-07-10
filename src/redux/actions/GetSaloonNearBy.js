// @flow

import { GET_SALOON_NEARBY, LOGOUT } from "./ActionTypes";

export function request(payload) {
  return {
    payload,
    type: GET_SALOON_NEARBY.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: GET_SALOON_NEARBY.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GET_SALOON_NEARBY.FAILURE
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
