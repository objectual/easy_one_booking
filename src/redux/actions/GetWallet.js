// @flow

import { GETWALLET, LOGOUT } from "./ActionTypes";

export function request(payload) {
  return {
    payload,
    type: GETWALLET.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: GETWALLET.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GETWALLET.FAILURE
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
