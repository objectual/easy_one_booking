import { take, put, call, fork } from 'redux-saga/effects';

import ApiSauce from '../../services/apiSauce';
import { customer_rating_for_company } from '../../config/WebServices';
import * as types from '../actions/ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';

import { success, failure } from '../actions/CustomerRatingForCompany';

import { ErrorHelper } from '../../helpers';

async function callRequest(data) {
  const token = await storeToken();
  return ApiSauce.postWithToken(customer_rating_for_company, data, token);
}

async function storeToken() {
  try {
    return await AsyncStorage.getItem('access_token');
  } catch (e) { }
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.CUSTOMER_RATING.REQUEST);

    // const { targetView } = payload;
    // delete payload.targetView;
    try {
      const response = yield call(callRequest, payload);
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
