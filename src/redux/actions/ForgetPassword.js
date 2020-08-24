// @flow

import {FORGET_PASSWORD} from './ActionTypes';

export function request(payload) {
  return {
    payload,
    type: FORGET_PASSWORD.REQUEST,
  };
}

export function success(data: Object) {
  return {
    data,
    type: FORGET_PASSWORD.SUCCESS,
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: FORGET_PASSWORD.FAILURE,
  };
}
