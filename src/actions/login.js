export const SETINPUTLOGINFORMVALUES = 'SETINPUTLOGINFORMVALUES';
export const SETISWAITINGLOGINFORMVALIDATION = 'SETISWAITINGLOGINFORMVALIDATION';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHECKEDIFLOGGED = 'CHECKEDIFLOGGED';
export const SETISLOGINERROR = 'SETISLOGINERROR';
export const RESETLOGINFORM = 'RESETLOGINFORM';

export const setInputLoginFormValues = (inputName, inputValues) => ({
    type: SETINPUTLOGINFORMVALUES,
    inputName,
    inputValues
});
export const setIsWaitingLoginFormValidation = (bool) => ({
    type: SETISWAITINGLOGINFORMVALIDATION,
    bool
});
export const logIn = () => ({
    type: LOGIN
});
export const logOut = () => ({
    type: LOGOUT
});
export const checkedIfLogged = () => ({
    type: CHECKEDIFLOGGED
});
export const setIsLoginError = (bool, errorMessage) => ({
    type: SETISLOGINERROR,
    bool,
    errorMessage
});
export const resetLoginForm = () => ({
    type: RESETLOGINFORM
});
