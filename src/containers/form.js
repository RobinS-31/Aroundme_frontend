// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Form from "../components/Form/form";
import { getCategories } from "../actions/products";
import {
    setInitialData,
    setInputFormValues,
    setIsWaitingFormValidation,
    setFormRequestIsValidated,
    setIsFormError,
    sendRegisterConsumer, getLocation
} from "../actions/form";

const mapStateToProps = (state, ownProps) => ({
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
    formRequestIsValidated: state.form.formRequestIsValidated,
    isFormError: state.form.isFormError,
    formErrorMessage: state.form.formErrorMessage,
    props: ownProps
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
