export const emailRegEx = RegExp('^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$');
export const passwordRegEx = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})');
export const lowerUpperCharRegEx = RegExp('^(?=.*[a-z])(?=.*[A-Z])');
export const numberCharRegEx = RegExp('^(?=.*[0-9])');
export const specialCharRegEx = RegExp('^(?=.*[!@#$%^&*])');
export const minLengthRegEx = RegExp('^(?=.{6,})');
