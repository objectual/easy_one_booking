import Immutable from 'seamless-immutable';
import * as types from '../actions/ActionTypes';

const initialState = {
  failure: false,
  isFetching: false,
  errorMessage: '',
  data: [],
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return {...state, data: [...state.data, action.data]};

    case types.REMOVE__FROM_CART:
      return {
        state,
        data: state.data.filter((val, index) => index !== action.data.index),
      };

    case types.REMOVE_ALL:
      return {state, data: []};

    default:
      return state;
  }
};
