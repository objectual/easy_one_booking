import {take, put, call, fork} from 'redux-saga/effects';

import ApiSauce from '../../services/apiSauce';
import {forget_password} from '../../config/WebServices';
import * as types from '../actions/ActionTypes';

import {success, failure} from '../actions/ForgetPassword';

import {ErrorHelper} from '../../helpers';

function callRequest(data) {
  return ApiSauce.post(forget_password, data);
}
function* watchRequest() {
  while (true) {
    const {payload} = yield take(types.FORGET_PASSWORD.REQUEST);

    console.log('pasdfuiasds', payload);
    // const { targetView } = payload;
    // delete payload.targetView;
    try {
      const response = yield call(callRequest, payload);

      console.log(response, 'registerregisterregisterregisterregisterregister');
      yield put(success(response));
      console.log('payloadpayload', response);
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
