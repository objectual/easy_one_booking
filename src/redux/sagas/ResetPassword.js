import { take, put, call, fork } from "redux-saga/effects";

import ApiSauce from "../../services/apiSauce";
import { reset_password_Api } from "../../config/WebServices";
import * as types from "../actions/ActionTypes";

import { success, failure } from "../actions/ResetPassword";

import { ErrorHelper } from "../../helpers";

function callRequest(data) {
    return ApiSauce.post(reset_password_Api, data);
}
function* watchRequest() {
    while (true) {
        const { payload } = yield take(types.RESET_PASSWORD.REQUEST);

        try {
            const response = yield call(callRequest, payload);
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
