import {take, put, call, fork} from 'redux-saga/effects';

import ApiSauce from '../../services/apiSauce';
import {get_wallet, initializeToken} from '../../config/WebServices';
import * as types from '../actions/ActionTypes';
import {Alert} from 'react-native';

import {success, failure} from '../actions/GetWallet';

import {ErrorHelper} from '../../helpers';
import AsyncStorage from '@react-native-community/async-storage';

async function callRequest(data) {
  const token = await storeToken();
  return ApiSauce.getWithToken(get_wallet, token);
}

async function storeToken() {
  try {
    return await AsyncStorage.getItem('access_token');
  } catch (e) {}
}
function* watchRequest() {
  while (true) {
    const {payload} = yield take(types.GETWALLET.REQUEST);

    // const { targetView } = payload;
    // delete payload.targetView;
    try {
      const response = yield call(callRequest, payload);
      console.log(response.data, 'eeeeeeeeeeeeeeeeeeeeee');
      yield call(storeToken);
      yield put(success(response));
    } catch (err) {
      yield put(failure(err));
      ErrorHelper.handleErrors(err, true);
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
