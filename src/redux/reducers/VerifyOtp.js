// @flow
import Immutable from 'seamless-immutable';
import * as types from '../actions/ActionTypes';

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: '',
  data: {},
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.OTP.REQUEST:
      return Immutable.merge(state, {
        isFetching: true,
        success: false,
      });
    case types.OTP.SUCCESS:
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: '',
        data: action.data,
        success: true,
      });
    case types.OTP.FAILURE:
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage,
        success: false,
      });
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
