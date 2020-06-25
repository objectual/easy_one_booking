import login from './Login';
import register from './Register';
import getSalon from './GetSaloon';
import getCategories from './GetCategories';
import getSaloonCategories from './SaloonCategories';
import getSaloonServicesByCategory from './GetSaloonServicesByCategory';
import getSaloonByCategory from './GetSaloonByCategory';
import createBooking from './CreateBooking';
import getEmployeesBySaloonAndCategory from './GetEmployeesBySaloonAndCategory';
import getServices from './GetServices';
import getSaloonNearBy from './GetSaloonNearBy';


// import forgotPassword from "./ForgotPassword";
// import verifyResetCode from "./VerifyResetCode";
// import resetPassword from "./ResetPassword";
// import socialLogin from "./SocialLogin";

import {fork} from 'redux-saga/effects';

export default function* rootSaga() {
  yield fork(login);
  yield fork(register);
  yield fork(getSalon);
  yield fork(getCategories);
  yield fork(getSaloonCategories);
  yield fork(getSaloonServicesByCategory);
  yield fork(getSaloonByCategory);
  yield fork(createBooking);
  yield fork(getEmployeesBySaloonAndCategory);
  yield fork(getServices);
  yield fork(getSaloonNearBy);

  
  // yield fork(forgotPassword);
  // yield fork(verifyResetCode);
  // yield fork(resetPassword);
  // yield fork(socialLogin);
}
