import {take, put, call, fork} from 'redux-saga/effects';

import ApiSauce from '../../services/apiSauce';
import {create_Booking_Api} from '../../config/WebServices';
import * as types from '../actions/ActionTypes';

import {success, failure} from '../actions/CreateBooking';

import {ErrorHelper} from '../../helpers';

function callRequest(data) {
  const access_token = data.access_token;
  delete data.access_token;
  console.log(data, 'dataqqqqqqqqqqqqqq');
  return ApiSauce.postWithToken(create_Booking_Api, data, access_token);
}
function* watchRequest() {
  while (true) {
    const {payload} = yield take(types.CREATE_BOOKING.REQUEST);
    // const { targetView } = payload;
    // delete payload.targetView;
    try {
      const response = yield call(callRequest, payload);

      console.log(response, 'bookingSuccesss');
      if (response.success) yield put(success(response));
      else yield put(failure(err));

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
