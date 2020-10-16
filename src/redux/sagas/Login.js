import { take, put, call, fork } from "redux-saga/effects";

import ApiSauce from "../../services/apiSauce";
import { login_Api, initializeToken } from "../../config/WebServices";
import * as types from "../actions/ActionTypes";

import { success, failure } from "../actions/Login";

import { ErrorHelper } from "../../helpers";
import AsyncStorage from '@react-native-community/async-storage';



function callRequest(data) {
  return ApiSauce.post(login_Api, data);
}

 async function storeToken(response) {
  try {
    await AsyncStorage.setItem('access_token', response.data.access_token)
    await initializeToken()
  } catch (e) {
   
  }
}

async function storeLoginResponce(response) {

  try {
    await AsyncStorage.setItem('loginResponce', JSON.stringify(response))
    console.log(response,'response');
  } catch (e) {
   
  }
}


function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.LOGIN.REQUEST);

    // const { targetView } = payload;
    // delete payload.targetView;
    try {
      const response = yield call(callRequest, payload);
      yield call(storeToken,response)
      yield call(storeLoginResponce,response)

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
