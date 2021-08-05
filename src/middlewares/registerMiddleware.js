import axios from 'axios';

import {
    GETLOCATION,
    SENDREGISTERCONSUMER,
    SENDREGISTERPRODUCER,
    sendRegisterProducer,
    setProducerLocation,
    setIsFormError,
    setFormRequestIsValidated,
    setIsWaitingFormValidation,
    resetRegisterForm
} from "../actions/form";

const registerMiddleware = store => next => async action => {
    const {
        firstname,
        lastname,
        address,
        city,
        postcode,
        phone,
        establishment,
        job,
        siret,
        description,
        imageFile,
        email,
        password,
        categories,
        lat,
        lon,
    } = store.getState().form;

    switch (action.type) {
        case GETLOCATION:
            try {
                const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${address}&postcode=${postcode}&city=${city}`);
                if (response.status !== 200) {
                    store.dispatch(setIsWaitingFormValidation(false));
                    store.dispatch(setIsFormError(true, 'L\'adresse indiqué n\'est pas correcte' ));
                } else {
                    const result = response.data.features[0].geometry.coordinates;
                    store.dispatch(setProducerLocation(result[0], result[1]));
                    store.dispatch(sendRegisterProducer());
                    next(action);
                }
            } catch (err) {
                console.error(err);
            }
            break;
        case SENDREGISTERPRODUCER:
            try {
                const dataProducer = {
                    firstname,
                    lastname,
                    address,
                    city,
                    postcode,
                    phone,
                    establishment,
                    job,
                    siret,
                    description,
                    email,
                    password,
                    lat,
                    lon,
                    categories
                };

                const formData = new FormData();
                formData.append('dataProducer', JSON.stringify(dataProducer));
                imageFile.forEach(file => {
                    formData.append('image', file);
                })

                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}api/auth/createProducer`,
                    formData,
                    {
                        'withCredentials': true,
                        headers: {'content-type': 'multipart/form-data'}
                    }
                );

                if (response.status === 200) {
                    store.dispatch(setIsWaitingFormValidation(false));
                    store.dispatch(setIsFormError(true, response.data.message));
                }
                if (response.status === 201) {
                    store.dispatch(setIsWaitingFormValidation(false));
                    store.dispatch(resetRegisterForm());
                    store.dispatch(setFormRequestIsValidated(true));
                    next(action);
                }
            } catch (err) {
                console.error(err);
            }
            break;
        case SENDREGISTERCONSUMER:
            try {
                const dataConsumer = {
                    firstname,
                    lastname,
                    address,
                    city,
                    postcode,
                    phone,
                    email,
                    password
                };

                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}api/auth/createUser`,
                    dataConsumer,
                    {
                        'withCredentials': true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                if (response.status === 200) {
                    store.dispatch(setIsWaitingFormValidation(false));
                    store.dispatch(setIsFormError(true, response.data.message));
                }
                if (response.status === 201) {
                    store.dispatch(setIsWaitingFormValidation(false));
                    store.dispatch(resetRegisterForm());
                    store.dispatch(setFormRequestIsValidated(true));
                    next(action);
                }
            } catch (err) {
                store.dispatch(setIsFormError(true, err));
            }
            break;
        default:
            next(action);
    }
};
export default registerMiddleware;
