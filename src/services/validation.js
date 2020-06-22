export const nameRegex = /^[a-zA-Z]+$/;
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
export const postalCodeRegex = /^\d{2,5}$/;
export const phoneNumberRegex = /^\d{10,11}$/;

// export const phoneNumberRegex = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

export async function validate(value, regex, message) {
  if (value == '' || value == null || String(() => value.trim()) == '') {
    return await 'This field is requried';
  } else {
    if (await regex.test(value)) {
      return await null;
    } else {
      return await message;
    }
  }
}
