// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Form from "../components/Form/form";
import { getCategories } from "../actions/products";
import {
    setInitialData,
    setInputFormValues,
    setIsWaitingFormValidation,
    setIsWaitingSecurityFormValidation,
    setFormRequestIsValidated,
    setIsFormError,
    sendRegisterConsumer,
    getLocation,
    setIsSecurityFormError,
    setSecurityFormRequestIsValidated
} from "../actions/form";
import { updateUser, updateProducer, updateSecurityAccount } from "../actions/dashboard";

const mapStateToProps = (state) => ({
    userData: state.user.userData,
    categoriesList: state.products.categories,
    firstname: state.form.firstname,
    lastname: state.form.lastname,
    address: state.form.address,
    city: state.form.city,
    postcode: state.form.postcode,
    phone: state.form.phone,
    establishment: state.form.establishment,
    job: state.form.job,
    siret: state.form.siret,
    description: state.form.description,
    imageFile: state.form.imageFile,
    email: state.form.email,
    password: state.form.password,
    categories: state.form.categories,
    oldPassword: state.form.oldPassword,
    isWaitingFormValidation: state.form.isWaitingFormValidation,
    isWaitingSecurityFormValidation: state.form.isWaitingSecurityFormValidation,
    formRequestIsValidated: state.form.formRequestIsValidated,
    securityFormRequestIsValidated: state.form.securityFormRequestIsValidated,
    isFormError: state.form.isFormError,
    isSecurityFormError: state.form.isSecurityFormError,
    formErrorMessage: state.form.formErrorMessage,
    securityFormErrorMessage: state.form.securityFormErrorMessage,
    formRequestValidatedMessage: state.form.formRequestValidatedMessage,
    securityFormRequestValidatedMessage: state.form.securityFormRequestValidatedMessage
});

const mapDispatchToProps = (dispatch) => ({
    getCategories: () => {
        dispatch(getCategories());
    },
    setInitialData: (initialdata) => {
        dispatch(setInitialData(initialdata));
    },
    setInputFormValues: (inputName, inputValues) => {
        dispatch(setInputFormValues(inputName, inputValues));
    },
    setIsWaitingFormValidation: (bool) => {
        dispatch(setIsWaitingFormValidation(bool));
    },
    setIsWaitingSecurityFormValidation: (bool) => {
        dispatch(setIsWaitingSecurityFormValidation(bool));
    },
    setFormRequestIsValidated: (bool) => {
        dispatch(setFormRequestIsValidated(bool))
    },
    setIsFormError: (bool, errorMessage) => {
        dispatch(setIsFormError(bool, errorMessage))
    },
    sendRegisterConsumer: () => {
        dispatch(sendRegisterConsumer());
    },
    getLocation: () => {
        dispatch(getLocation());
    },
    updateUser: () => {
        dispatch(updateUser());
    },
    updateProducer: () => {
        dispatch(updateProducer());
    },
    updateSecurityAccount: () => {
        dispatch(updateSecurityAccount());
    },
    setIsSecurityFormError: (bool, errorMessage) => {
        dispatch(setIsSecurityFormError(bool, errorMessage));
    },
    setSecurityFormRequestIsValidated: (bool, message) => {
        dispatch(setSecurityFormRequestIsValidated(bool, message));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
