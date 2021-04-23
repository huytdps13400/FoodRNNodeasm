import * as yup from 'yup';
export const convertCurrency = (value) => {
  if (value == null) {
    return 0;
  }
  if (typeof value !== 'string') {
    value = value.toString();
  }
  if (value === '0') {
    return '0';
  }
  let result = '';
  if (value.length >= 4) {
    result = `${value.substr(0, value.length - 3)}.${value.substr(
      value.length - 3,
      value.length,
    )}`;
  }
  if (value.length >= 7) {
    result = `${value.substr(0, value.length - 6)}.${value.substr(
      value.length - 6,
      3,
    )}.${value.substr(value.length - 3, value.length)}`;
  }
  if (value.length >= 10) {
    result = `${value.substr(0, value.length - 9)}.${value.substr(
      value.length - 9,
      3,
    )}.${value.substr(value.length - 6, 3)}.${value.substr(
      value.length - 3,
      value.length,
    )}`;
  }

  return result;
};
export const signUpValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});
