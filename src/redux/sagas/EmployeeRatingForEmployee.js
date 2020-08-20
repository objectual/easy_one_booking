import {take, put, call, fork} from 'redux-saga/effects';

import ApiSauce from '../../services/apiSauce';
import {customer_rating_for_employee} from '../../config/WebServices';
import * as types from '../actions/ActionTypes';

import {success, failure} from '../actions/Register';

import {ErrorHelper} from '../../helpers';

function callRequest(data) {
  return ApiSauce.post(customer_rating_for_employee, data);
}
function* watchRequest() {
  while (true) {
    const {payload} = yield take(types.CUSTOMER_RATING.REQUEST);

    // const { targetView } = payload;
    // delete payload.targetView;
    try {
      const response = yield call(callRequest, payload);
      console.log('fasdASDFASDF', response, 'sfsfsfd');
      yield put(success(response));
      //   setTimeout(() => {
      //     Actions.verify({
      //       phoneNumber: JSON.stringify(payload.phoneNumber).replace(/\"/g, ""),
      //       targetView: targetView,

      //       title: strings("navtitles.otp")
      //     });
      //   }, 800);
    } catch (err) {
      yield put(failure(err));
      ErrorHelper.handleErrors(err, true);
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
