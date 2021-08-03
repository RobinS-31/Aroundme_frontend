// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Login from "../components/Header/LoginButton/Login/login";
import {
    setInputLoginFormValues,
    setIsWaitingLoginFormValidation,
    logIn,
    setIsLoginError
} from '../actions/login';

const mapStateToProps = (state, ownProps) => ({
    isLoginError: state.login.isLoginError,
    email: state.login.email,
    password: state.login.password,
    isWaitingLoginFormValidation: state.login.isWaitingLoginFormValidation,
    loginErrorMessage: state.login.loginErrorMessage,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({
    setInputLoginFormValues: (inputName, inputValues) => {
        dispatch(setInputLoginFormValues(inputName, inputValues));
    },
    setIsWaitingLoginFormValidation: (bool) => {
        dispatch(setIsWaitingLoginFormValidation(bool));
    },
    logIn: () => {
        dispatch(logIn());
    },
    setIsLoginError: (bool, errorMessage) => {
        dispatch(setIsLoginError(bool, errorMessage));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
