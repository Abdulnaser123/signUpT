/** @format */

export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9-_@]{3,}$/;
  return usernameRegex.test(username);
};

export const validateFullName = (fullName) => {
  return fullName.length >= 3 && fullName.length <= 15;
};

export const validateMobile = (mobile) => {
  const mobileRegex = /^05\d{8}$/;
  return mobileRegex.test(mobile);
};

export const validateAge = (age) => {
  if (!age) {
    return true;
  }
  const numericAge = parseInt(age, 10);
  return numericAge >= 18 && numericAge <= 100;
};

export const validateEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@_\-]).{6,24}$/;
  return passwordRegex.test(password);
};

export const validatePasswordConfirmation = (password, confirmPassword) => {
  return password === confirmPassword;
};
