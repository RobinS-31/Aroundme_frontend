import axios from 'axios';

import {
    setFormRequestIsValidated,
    setIsWaitingFormValidation,
} from "../actions/form";

const dashboardMiddleware = store => next => async action => {

    switch (action.type) {
        default:
            next(action);
    }
};
export default dashboardMiddleware;
