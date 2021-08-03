import axios from 'axios';
import {
    GETLOCATION,
    SENDREGISTERCONSUMER,
    SENDREGISTERPRODUCER,
    sendRegisterProducer,
    setProducerLocation,
    setIsRegisterFormError,
    setRegistrationIsValidated,
    setIsWaitingRegisterFormValidation,
    resetRegisterForm
} from "../actions/registerForm";

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
        location,
        category
    } = store.getState().registerForm;

    switch (action.type) {
        case GETLOCATION:
            try {
                const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${address}&postcode=${postcode}&city=${city}`);
                if (response.status !== 200) {
                    store.dispatch(setIsWaitingRegisterFormValidation(false));
                    store.dispatch(setIsRegisterFormError(true, 'L\'adresse indiqué n\'est pas correcte' ));
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
                    lat: location.lat,
                    lon: location.lon,
                    category
                };

                const formData = new FormData();
                formData.append('dataProducer', JSON.stringify(dataProducer));
                imageFile.forEach(file => {
                    formData.append('image', file);
                })

                const response = await axios.post(
                    'http://localhost:5000/api/auth/createProducer',
                    formData,
                    {
                        'withCredentials': true,
                        headers: {'content-type': 'multipart/form-data'}
                    }
                );

                if (response.status === 200) {
                    store.dispatch(setIsWaitingRegisterFormValidation(false));
                    store.dispatch(setIsRegisterFormError(true, response.data.message));
                }
                if (response.status === 201) {
                    store.dispatch(setIsWaitingRegisterFormValidation(false));
                    store.dispatch(resetRegisterForm());
                    store.dispatch(setRegistrationIsValidated(true));
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
                    'http://localhost:5000/api/auth/createUser',
                    dataConsumer,
                    {
                        'withCredentials': true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                if (response.status === 200) {
                    store.dispatch(setIsWaitingRegisterFormValidation(false));
                    store.dispatch(setIsRegisterFormError(true, response.data.message));
                }
                if (response.status === 201) {
                    store.dispatch(setIsWaitingRegisterFormValidation(false));
                    store.dispatch(resetRegisterForm());
                    store.dispatch(setRegistrationIsValidated(true));
                    next(action);
                }
            } catch (err) {
                store.dispatch(setIsRegisterFormError(true, err));
            }
            break;
        default:
            next(action);
    }
};
export default registerMiddleware;
