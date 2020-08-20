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
    case types.EMPLOYEE_RATING.REQUEST:
      return Immutable.merge(state, {
        isFetching: true,
      });
    case types.EMPLOYEE_RATING.SUCCESS:
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: '',
        data: action.data,
      });
    case types.EMPLOYEE_RATING.FAILURE:
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage,
      });
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
