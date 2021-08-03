import {
    SETINPUTREGISTERFORMVALUES,
    SETISREGISTERFORMERROR,
    SETISWAITINGREGISTERFORMVALIDATION,
    SETPRODUCERLOCATION,
    SETREGISTRATIONISVALIDATED,
    RESETREGISTERFORM
} from '../actions/registerForm';

const initialState = {
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    postcode: '',
    phone: '',
    establishment: '',
    job: '',
    siret: '',
    description: '',
    imageFile: [],
    email: '',
    password: '',
    location: {
        lat: '',
        lon: ''
    },
    category: '60c0c06e614e0cd0ec8540bd',
    isWaitingRegisterFormValidation: false,
    registrationIsValidated: false,
    isRegisterFormError: false,
    registerFormErrorMessage: ''
};

const registerForm = (state = initialState, action = {}) => {
    switch (action.type) {
        case SETINPUTREGISTERFORMVALUES:
            return {
                ...state,
                [action.inputName]: action.inputValues
            };
        case SETISREGISTERFORMERROR:
            return {
                ...state,
                isRegisterFormError: action.bool,
                registerFormErrorMessage: action.errorMessage
            };
        case SETISWAITINGREGISTERFORMVALIDATION:
            return {
                ...state,
                isWaitingRegisterFormValidation: action.bool
            };
        case SETPRODUCERLOCATION:
            return {
                ...state,
                location: { lat: action.lat, lon: action.lon }
            };
        case SETREGISTRATIONISVALIDATED:
            return {
                ...state,
                registrationIsValidated: action.bool
            };
        case RESETREGISTERFORM:
            return initialState;
        default: return state;
    }
}
export default registerForm;
