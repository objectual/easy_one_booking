// @flow

import {EMPLOYEE_RATING} from './ActionTypes';

export function request(payload) {
  return {
    payload,
    type: EMPLOYEE_RATING.REQUEST,
  };
}

export function success(data: Object) {
  return {
    data,
    type: EMPLOYEE_RATING.SUCCESS,
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: EMPLOYEE_RATING.FAILURE,
  };
}
