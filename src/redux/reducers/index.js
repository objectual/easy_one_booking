import {combineReducers} from 'redux';

import login from './Login';
import register from './Register';
import getSaloon from './GetSaloon';
import getCategories from './GetCategories';
import getSaloonCategories from './SaloonCategories';
import getSaloonServicesByCategory from './GetSaloonServicesByCategory';
import getSaloonByCategory from './GetSaloonByCategory';
import createBooking from './CreateBooking';
import getEmployeesBySaloonAndCategory from './GetEmployeesBySaloonAndCategory';
import cart from './Cart';
import getServices from './GetServices';
import getSaloonNearBy from './GetSaloonNearBy';
import getBooking from './GetBooking';
import getWallet from './GetWallet';
import updateBooking from './UpdateBooking';
import customerRating from './CustomerRatingForEmployee';
import employeeRating from './EmployeeRatingForCustomer';

// import forgotPassword from "./ForgotPassword";
// import verifyResetCode from "./VerifyResetCode";
// import resetPassword from "./ResetPassword";
// import socialLogin from "./SocialLogin";

export const rootReducer = combineReducers({
  login,
  register,
  // forgotPassword,
  // verifyResetCode,
  // resetPassword,
  // socialLogin,
  getSaloon,
  getCategories,
  getSaloonCategories,
  getSaloonServicesByCategory,
  getSaloonByCategory,
  createBooking,
  getEmployeesBySaloonAndCategory,
  cart,
  getServices,
  getSaloonNearBy,
  getBooking,
  updateBooking,
  getWallet,
  customerRating,
  employeeRating,
});
