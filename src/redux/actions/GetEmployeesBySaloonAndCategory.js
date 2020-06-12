// @flow

import {GET_EMPLOYEES_BY_SALOON_AND_CATEGORY} from './ActionTypes';

export function request(payload) {
  return {
    payload,
    type: GET_EMPLOYEES_BY_SALOON_AND_CATEGORY.REQUEST,
  };
}

export function success(data: Object) {
  return {
    data,
    type: GET_EMPLOYEES_BY_SALOON_AND_CATEGORY.SUCCESS,
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GET_EMPLOYEES_BY_SALOON_AND_CATEGORY.FAILURE,
  };
}
