// @flow
import Immutable from 'seamless-immutable';
import * as types from '../actions/ActionTypes';

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: '',
  data: {},
  success: false
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.CREATE_BOOKING.REQUEST:
      return Immutable.merge(state, {
        isFetching: true,
      });
    case types.CREATE_BOOKING.SUCCESS:
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: '',
        data: action.data,
        success: true
      });
    case types.CREATE_BOOKING.FAILURE:
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage,
      });

      case types.HIDE_MODAL:
      return Immutable.merge(state, {
        success: false,
      });

      
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
