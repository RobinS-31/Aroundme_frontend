import {
    SETINPUTLOGINFORMVALUES,
    SETISWAITINGLOGINFORMVALIDATION,
    SETISLOGINERROR,
    RESETLOGINFORM
} from '../actions/login';

const initialState = {
    isLoginError: false,
    loginErrorMessage: '',
    email: '',
    password: '',
    isWaitingLoginFormValidation: false
};

const login = (state = initialState, action = {}) => {
    switch (action.type) {
        case SETINPUTLOGINFORMVALUES:
            return {
                ...state,
                [action.inputName]: action.inputValues
            };
        case SETISWAITINGLOGINFORMVALIDATION:
            return {
                ...state,
                isWaitingLoginFormValidation: action.bool
            };
        case SETISLOGINERROR:
            return {
                ...state,
                isLoginError: action.bool,
                loginErrorMessage: action.errorMessage
            };
        case RESETLOGINFORM:
            return initialState;
        default: return state;
    }
};

export default login;
