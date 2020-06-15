import { take, put, call, fork } from "redux-saga/effects";

import ApiSauce from "../../services/apiSauce";
import { get_Saloon_Categories_Api } from "../../config/WebServices";
import * as types from "../actions/ActionTypes";

import { success, failure } from "../actions/SaloonCategories";

import { ErrorHelper } from "../../helpers";

function callRequest(data) {
  // const access_token = data.access_token;
  // delete data.access_token;
  // return ApiSauce.postWithToken(get_Saloon_Api, data, access_token);
  // return ApiSauce.get(`${get_Saloon_Categories_Api}?id=${data.id}`);
  return ApiSauce.post(get_Saloon_Categories_Api, data);
}
function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.GET_SALOON_CATEGORIES.REQUEST);
    // const { targetView } = payload;
    // delete payload.targetView;
    try {
      const response = yield call(callRequest, payload);
      // console.log(response,"responseresponseresponseresponseresponseresponseresponse")
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
