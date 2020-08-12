// @flow

import { CUSTOMER_RATING } from "./ActionTypes";

export function request(payload) {
  return {
    payload,
    type: CUSTOMER_RATING.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: CUSTOMER_RATING.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: CUSTOMER_RATING.FAILURE
  };
}