import {take, put, call, fork} from 'redux-saga/effects';

import ApiSauce from '../../services/apiSauce';
import {update_booking_api} from '../../config/WebServices';
import * as types from '../actions/ActionTypes';
import {success, failure} from '../actions/updateBooking';
import {ErrorHelper} from '../../helpers';
import AsyncStorage from '@react-native-community/async-storage';

async function callRequest(payload) {
  const token = await storeToken();
  return ApiSauce.putWithToken(update_booking_api, payload, token);
}

async function storeToken() {
  try {
    return await AsyncStorage.getItem('access_token');
  } catch (e) {}
}

function* watchRequest() {
  while (true) {
    const {payload} = yield take(types.UPDATE_BOOKING.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield call(storeToken);
      yield put(success(response));
    } catch (err) {
      yield put(failure(err));
      ErrorHelper.handleErrors(err, true);
      console.log(err, 'errorerrorerrorerrorerror');
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
