import {take, put, call, fork} from 'redux-saga/effects';

import ApiSauce from '../../services/apiSauce';
import {verify_otp} from '../../config/WebServices';
import * as types from '../actions/ActionTypes';

import {success, failure} from '../actions/VerifyOtp';

import {ErrorHelper} from '../../helpers';

function callRequest(data) {
  return ApiSauce.post(verify_otp, data);
}
function* watchRequest() {
  while (true) {
    const {payload} = yield take(types.OTP.REQUEST);

    // const { targetView } = payload;
    // delete payload.targetView;
    try {
      const response = yield call(callRequest, payload);

      console.log('responseee', response);
      // console.log(response, "registerregisterregisterregisterregisterregister");
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
