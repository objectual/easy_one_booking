// @flow

import {OTP, LOGOUT} from './ActionTypes';

export function request(payload) {
  return {
    payload,
    type: OTP.REQUEST,
  };
}

export function success(data: Object) {
  return {
    data,
    type: OTP.SUCCESS,
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: OTP.FAILURE,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
