import login from "./Login";
import register from "./Register";
import getSalon from './GetSaloon'
import getCategories from './SaloonCategories'
import getSaloonCategories from './GetCategories'
// import forgotPassword from "./ForgotPassword";
// import verifyResetCode from "./VerifyResetCode";
// import resetPassword from "./ResetPassword";
// import socialLogin from "./SocialLogin";

import { fork } from "redux-saga/effects";

export default function* rootSaga() {
  yield fork(login);
  yield fork(register);
  yield fork(getSalon);
  yield fork(getCategories);
  yield fork(getSaloonCategories);
  // yield fork(forgotPassword);
  // yield fork(verifyResetCode);
  // yield fork(resetPassword);
  // yield fork(socialLogin);

}
