import Immutable from 'seamless-immutable';
import * as types from '../actions/ActionTypes';

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: '',
  data: [],
});

export default (state: Object = initialState, action: Object) => {
    
  switch (action.type) {
    case types.ADD_TO_CART:

    console.log(action.data,'addtocardstart')
        return Immutable.merge(state, {
            data: [...initialState.data,action.data],
          });

    case types.REMOVE__FROM_CART:
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: '',
        data: action.data,
      });

      default:
      return state;
   
  }
};

