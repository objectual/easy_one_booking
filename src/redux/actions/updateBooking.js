// @flow

import {UPDATE_BOOKING, LOGOUT} from './ActionTypes';

export function request(payload) {
  return {
    payload,
    type: UPDATE_BOOKING.REQUEST,
  };
}

export function success(data: Object) {
  return {
    data,
    type: UPDATE_BOOKING.SUCCESS,
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: UPDATE_BOOKING.FAILURE,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
