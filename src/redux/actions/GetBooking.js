// @flow

import { GET_BOOKING, LOGOUT } from "./ActionTypes";

export function request(payload) {
  return {
    payload,
    type: GET_BOOKING.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: GET_BOOKING.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GET_BOOKING.FAILURE
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
