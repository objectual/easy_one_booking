// export const baseUrl = "http://itsolution24x7.com/request_form/";
// export const register_API = `${baseUrl}/api/v1/register`;

export const baseUrl = 'https://easy-one.herokuapp.com/api/'; // live
// export const baseUrl = 'https://easy-one-staging.herokuapp.com/api/'; // stagingbb

// export const baseUrl = "http://192.168.0.111/reactboilerplate/";
// export const baseUrl = 'http://192.168.18.10:3000/api/'; // H 

export const login_Api = `${baseUrl}user/login`;
export const register_Api = `${baseUrl}user/register`;
export const forget_Saloon_NearApiget_password_Api = `${baseUrl}forget-password`;
export const verify_reset_code_Api = `${baseUrl}verify-reset-code`;
export const reset_password_Api = `${baseUrl}password/reset`;
export const social_login_Api = `${baseUrl}social_login`;
export const get_Saloon_Api = `${baseUrl}saloon/getSaloon`;
export const get_Saloon_NearApi = `${baseUrl}saloon/Nearby`;
export const get_Categories_Api = `${baseUrl}saloon/getAllCategories`;
export const get_Saloon_Categories_Api = `${baseUrl}saloon/getSaloonCategories`;
export const get_Saloon_Services_By_Category_Api = `${baseUrl}saloon/getSaloonServicesByCategory`;
export const get_Saloon_By_Category_Api = `${baseUrl}saloon/getSaloonsByCategory`;
export const create_Booking_Api = `${baseUrl}booking/createBooking`;
export const get_Employees_By_Saloon_And_Category_Api = `${baseUrl}saloon/getEmployeesBySaloonAndService`;
export const get_Services_Api = `${baseUrl}service/getService`;
export const get_Booking = `${baseUrl}booking/getAllBookingsByUser`;
export const update_booking_api = `${baseUrl}booking/updateBooking`;
export const get_wallet = `${baseUrl}wallet/getWallet`;
export const customer_rating_for_company = `${baseUrl}rating/createRating`;
export const customer_rating_for_employee = `${baseUrl}rating/customerRatingForEmployee`;
export const forget_password = `${baseUrl}password/forget`;
export const verify_otp = `${baseUrl}password/otpcode`;
export const logout_api = `${baseUrl}user/logout`;

export const secret_Key = 'AIzaSyCIGENLCfCwZwPaumiUQs21GfgMhgppa7s';
export const place_Autocomplete_URL =
  'https://maps.googleapis.com/maps/api/place/autocomplete/json?';
export const place_Details_URL =
  'https://maps.googleapis.com/maps/api/place/details/json?';

export const place_reverse_Geocoding_URL =
  'https://maps.googleapis.com/maps/api/geocode/json?';

import AsyncStorage from '@react-native-community/async-storage';
export var token = null;

export async function initializeToken() {
  try {
    token = await AsyncStorage.getItem('access_token');
  } catch (e) {
    // error reading value
  }
}

export async function getUserInfo() {
  try {
    return await AsyncStorage.getItem('loginResponce');
  } catch (e) {
    // error reading value
  }
}
