import {
    SETINITIALDATA,
    SETINPUTFORMVALUES,
    SETISWAITINGFORMVALIDATION,
    SETISWAITINGSECURITYFORMVALIDATION,
    SETISFORMERROR,
    SETFORMREQUESTISVALIDATED,
    RESETFORM,
    SETPRODUCERLOCATION,
    SETISSECURITYFORMERROR,
    SETSECURITYFORMREQUESTISVALIDATED
} from "../actions/form";

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
    oldPassword: '',
    categories: [],
    lat: '',
    lon: '',
    isWaitingFormValidation: false,
    isWaitingSecurityFormValidation: false,
    formRequestIsValidated: false,
    securityFormRequestIsValidated: false,
    formRequestValidatedMessage: '',
    securityFormRequestValidatedMessage: '',
    isFormError: false,
    isSecurityFormError: false,
    formErrorMessage: '',
    securityFormErrorMessage: ''
};

const form = (state = initialState, action = {}) => {
    switch (action.type) {
        case SETINITIALDATA:
            return {
                ...state,
                ...action.initialData
            };
        case SETINPUTFORMVALUES:
            return {
                ...state,
                [action.inputName]: action.inputValues
            };
        case SETISFORMERROR:
            return {
                ...state,
                isFormError: action.bool,
                formErrorMessage: action.errorMessage
            };
        case SETISSECURITYFORMERROR:
            return {
                ...state,
                isSecurityFormError: action.bool,
                securityFormErrorMessage: action.errorMessage
            }
        case SETISWAITINGFORMVALIDATION:
            return {
                ...state,
                isWaitingFormValidation: action.bool
            };
        case SETISWAITINGSECURITYFORMVALIDATION:
            return {
                ...state,
                isWaitingSecurityFormValidation: action.bool
            };
        case SETFORMREQUESTISVALIDATED:
            return {
                ...state,
                formRequestIsValidated: action.bool,
                formRequestValidatedMessage: action.message
            };
        case SETSECURITYFORMREQUESTISVALIDATED:
            return {
                ...state,
                securityFormRequestIsValidated: action.bool,
                securityFormRequestValidatedMessage: action.message
            }
        case RESETFORM:
            return initialState;
        case SETPRODUCERLOCATION:
            return {
                ...state,
                lat: action.lat,
                lon: action.lon
            };
        default: return state;
    }
};
export default form;
