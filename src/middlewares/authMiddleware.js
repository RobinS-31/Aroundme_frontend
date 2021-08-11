import axios from 'axios';
import {
    LOGIN,
    LOGOUT,
    CHECKEDIFLOGGED,
    setIsWaitingLoginFormValidation,
    setIsLoginError,
    resetLoginForm
} from "../actions/login";
import { setUserData, resetUserData, getUserLocation } from "../actions/user";
import { resetRegisterForm } from "../actions/form";

const authMiddleware = store => next => async action => {
    const { email, password } = store.getState().login;

    switch (action.type) {
        case LOGIN:
            try {
                const dataLogin = {
                    email,
                    password
                };

                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}api/auth/login`,
                    dataLogin,
                    {
                        'withCredentials': true,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                if (response.status === 200) {
                    const { xsrfToken, userInfo } = response.data;
                    store.dispatch(setUserData(userInfo._id, userInfo, xsrfToken));
                    store.dispatch(setIsWaitingLoginFormValidation(false));
                    store.dispatch(resetLoginForm());
                    if (!userInfo.isProducer) store.dispatch(getUserLocation());
                    next(action);
                }
            } catch (err) {
                console.error("LOGIN err :", err);
                store.dispatch(setIsWaitingLoginFormValidation(false));
                store.dispatch(setIsLoginError(true, 'Une erreur est survenue, veuillez essayer de vous reconnecter.'));
            }
            break;
        case LOGOUT:
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}api/auth/logout`,
                    {
                        'withCredentials': true,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                if (response.status === 200) {
                    store.dispatch(resetUserData());
                    store.dispatch(resetRegisterForm());
                    next(action);
                }
            } catch (err) {
                console.error("LOGOUT err :", err);
            }
            break;
        case CHECKEDIFLOGGED:
            try {
                const { location } = store.getState().user;

                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}api/auth/checkediflogged`,
                    {
                        'withCredentials': true,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                if (response.status === 200) {
                    const { xsrfToken, userInfo } = response.data;
                    store.dispatch(setUserData(userInfo._id, userInfo, xsrfToken));
                    if (!userInfo.isProducer && !location.lat && !location.lon) store.dispatch(getUserLocation());
                } else {
                    store.dispatch(resetUserData());
                }
                next(action);
            } catch (err) {
                console.error("CHECKEDIFLOGGED err :", err);
            }
            break;
        default:
            next(action);
    }
};
export default authMiddleware;
