import { take, put, call, fork } from "redux-saga/effects";

import ApiSauce from "../../services/apiSauce";
import { get_Booking } from "../../config/WebServices";
import * as types from "../actions/ActionTypes";

import { success, failure } from "../actions/GetBooking";

import { ErrorHelper } from "../../helpers";

function callRequest(data) {
  const access_token = data.payload.data.access_token;
  console.log(access_token,'get_Booking')
  return ApiSauce.getWithToken(get_Booking,access_token);

}
function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.GET_BOOKING.REQUEST);
    // const { targetView } = payload;
    // delete payload.targetView;
    try {
      const response = yield call(callRequest, payload);
      console.log(response, "get_Booking")
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
      // ErrorHelper.handleErrors(err, true);
    }
  }
}




export default function* root() {
  yield fork(watchRequest);
}
