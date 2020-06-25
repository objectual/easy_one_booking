// @flow

import {CREATE_BOOKING, LOGOUT, HIDE_MODAL } from './ActionTypes';

export function request(payload) {
  return {
    payload,
    type: CREATE_BOOKING.REQUEST,
  };
}

export function success(data: Object) {
  return {
    data,
    type: CREATE_BOOKING.SUCCESS,
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: CREATE_BOOKING.FAILURE,
  };
}


export function hideModal(errorMessage: Object) {
  return {
    type: HIDE_MODAL,
  };
}


export function logout() {
  return {
    type: LOGOUT,
  };
}
