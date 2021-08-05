import {
    SETINITIALDATA,
    SETINPUTFORMVALUES,
    SETISWAITINGFORMVALIDATION,
    SETISFORMERROR,
    SETFORMREQUESTISVALIDATED,
    RESETFORM,
    SETPRODUCERLOCATION
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
    formRequestIsValidated: false,
    isFormError: false,
    formErrorMessage: ''
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
        case SETISWAITINGFORMVALIDATION:
            return {
                ...state,
                isWaitingFormValidation: action.bool
            };
        case SETFORMREQUESTISVALIDATED:
            return {
                ...state,
                formRequestIsValidated: action.bool
            };
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
