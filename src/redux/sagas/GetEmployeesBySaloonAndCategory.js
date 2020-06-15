import {take, put, call, fork} from 'redux-saga/effects';

import ApiSauce from '../../services/apiSauce';
import {get_Employees_By_Saloon_And_Category_Api} from '../../config/WebServices';
import * as types from '../actions/ActionTypes';

import {success, failure} from '../actions/GetEmployeesBySaloonAndCategory';

import {ErrorHelper} from '../../helpers';

function callRequest(data) {
  return ApiSauce.post(get_Employees_By_Saloon_And_Category_Api, data);
}
function* watchRequest() {
  while (true) {
    const {payload} = yield take(
      types.GET_EMPLOYEES_BY_SALOON_AND_CATEGORY.REQUEST,
    );

    // const { targetView } = payload;
    // delete payload.targetView;
    try {
      const response = yield call(callRequest, payload);
      console.log(response, 'responseresponseresponseresponseresponse');
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
