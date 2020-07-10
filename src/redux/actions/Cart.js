// @flow

import {ADD_TO_CART, REMOVE__FROM_CART, REMOVE_ALL} from './ActionTypes';

export function add(data: Object) {
  return {
    data,
    type: ADD_TO_CART,
  };
}

export function remove(data: Object) {
  return {
    data,
    type: REMOVE__FROM_CART,
  };
}

export function removeAll(data: Object) {
  return {
    data,
    type: REMOVE_ALL,
  };
}
