// @flow

import { GET_SERVICES, LOGOUT } from "./ActionTypes";

export function request(payload) {
  return {
    payload,
    type: GET_SERVICES.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: GET_SERVICES.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GET_SERVICES.FAILURE
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
