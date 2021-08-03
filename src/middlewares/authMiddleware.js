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
                    'http://localhost:5000/api/auth/login',
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
                    if (!userInfo.isProducer) {
                        store.dispatch(getUserLocation());
                    }
                    next(action);
                } else {
                    store.dispatch(setIsLoginError(true, 'Une erreur est survenue, veuillez essayer de vous reconnecter'));
                }
            } catch (err) {
                console.log("err :",err);
            }
            break;
        case LOGOUT:
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/auth/logout',
                    {
                        'withCredentials': true,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                if (response.status === 200) {
                    store.dispatch(resetUserData());
                    next(action);
                }
            } catch (err) {
                console.log("err :",err);
            }
            break;
        case CHECKEDIFLOGGED:
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/auth/checkediflogged',
                    {
                        'withCredentials': true,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                if (response.status === 200) {
                    const { xsrfToken, userInfo } = response.data;
                    store.dispatch(setUserData(userInfo._id, userInfo, xsrfToken));
                    if (!userInfo.isProducer) {
                        store.dispatch(getUserLocation());
                    }
                } else {
                    store.dispatch(resetUserData());
                }
                next(action);
            } catch (err) {
                console.log("err :",err);
            }
            break;
        default:
            next(action);
    }
};
export default authMiddleware;