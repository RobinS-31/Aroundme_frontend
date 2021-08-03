// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import RegisterForm from "../components/RegisterAccount/RegisterForm/registerForm";
import {
    setInputRegisterFormValues,
    setIsRegisterFormError,
    setIsWaitingRegisterFormValidation,
    sendRegisterConsumer,
    setRegistrationIsValidated,
    getLocation
} from '../actions/registerForm';
import { getCategories } from "../actions/products";

const mapStateToProps = (state, ownProps) => ({
    firstname: state.registerForm.firstname,
    lastname: state.registerForm.lastname,
    address: state.registerForm.address,
    city: state.registerForm.city,
    postcode: state.registerForm.postcode,
    email: state.registerForm.email,
    phone: state.registerForm.phone,
    password: state.registerForm.password,
    establishment: state.registerForm.establishment,
    job: state.registerForm.job,
    siret: state.registerForm.siret,
    description: state.registerForm.description,
    imageFile: state.registerForm.imageFile,
    isRegisterFormError: state.registerForm.isRegisterFormError,
    registerFormErrorMessage: state.registerForm.registerFormErrorMessage,
    isWaitingRegisterFormValidation: state.registerForm.isWaitingRegisterFormValidation,
    registrationIsValidated: state.registerForm.registrationIsValidated,
    categories: state.products.categories,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({
    setInputRegisterFormValues: (inputName, inputValues) => {
        dispatch(setInputRegisterFormValues(inputName, inputValues));
    },
    setIsRegisterFormError: (bool, errorMessage) => {
        dispatch(setIsRegisterFormError(bool, errorMessage));
    },
    setIsWaitingRegisterFormValidation: (bool) => {
        dispatch(setIsWaitingRegisterFormValidation(bool));
    },
    sendRegisterConsumer: () => {
        dispatch(sendRegisterConsumer());
    },
    getLocation: () => {
        dispatch(getLocation());
    },
    setRegistrationIsValidated: (bool) => {
        dispatch(setRegistrationIsValidated(bool));
    },
    getCategories: () => {
        dispatch(getCategories());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
