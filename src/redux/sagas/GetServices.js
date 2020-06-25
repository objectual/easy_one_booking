import { take, put, call, fork } from "redux-saga/effects";

import ApiSauce from "../../services/apiSauce";
import { get_Categories_Api,get_Services_Api } from "../../config/WebServices";
import * as types from "../actions/ActionTypes";

import { success, failure } from "../actions/GetServices";

import { ErrorHelper } from "../../helpers";

function callRequest() {
  // const access_token = data.access_token;
  // delete data.access_token;
  // return ApiSauce.postWithToken(get_Saloon_Api, data, access_token);

  return ApiSauce.get(get_Services_Api, {});

}
function* watchRequest() {

  while (true) {
    const { payload } = yield take(types.GET_SERVICES.REQUEST);
    // const { targetView } = payload;
    // delete payload.targetView;
    try {
      const response = yield call(callRequest);
      console.log(response,"get_Services_Api")
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
