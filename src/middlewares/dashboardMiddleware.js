import axios from 'axios';

import {
    setFormRequestIsValidated,
    setIsFormError,
    setIsWaitingFormValidation,
} from "../actions/form";
import { UPDATEUSER, UPDATEPRODUCER, UPDATESECURITYACCOUNT } from "../actions/dashboard";
import { setUserData, resetUserData, getUserLocation } from "../actions/user";

const dashboardMiddleware = store => next => async action => {

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
        oldPassword,
        categories,
        lat,
        lon,
    } = store.getState().form;

    const { userData, userId, xsrfToken } = store.getState().user;

    switch (action.type) {
        case UPDATEUSER :
            next(action);
            break;
        case UPDATEPRODUCER :
            try {
                const producerData = {
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
                    imageUrl: userData.imageUrl,
                    email,
                    categories,
                    xsrfToken,
                    userId
                };

                if (address !== userData.address || city !== userData.city || postcode !== userData.postcode) {
                    const getProducerLocation = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${address}&postcode=${postcode}&city=${city}`);

                    if (getProducerLocation.status === 200) {
                        const result = getProducerLocation.data.features[0].geometry.coordinates;
                        producerData.lon = result[0];
                        producerData.lat = result[1];
                    } else {
                        store.dispatch(setIsFormError(true, "Erreur dans l'adresse ou adresse inconnue"));
                        store.dispatch(setIsWaitingFormValidation(false));
                        break;
                    }
                }

                const formData = new FormData();
                formData.append('producerData', JSON.stringify(producerData));
                imageFile.forEach(file => {
                    formData.append('image', file);
                });

                const response = await axios.put(
                    `${process.env.REACT_APP_API_URL}api/dashboard/updateproducer`,
                    formData,
                    {
                        'withCredentials': true,
                        headers: {'content-type': 'multipart/form-data'}
                    }
                );

                if (response.status === 200) {
                    store.dispatch(setUserData(response.data._id, response.data, xsrfToken));
                    store.dispatch(setIsWaitingFormValidation(false));
                    store.dispatch(setFormRequestIsValidated(true, 'Vos informations ont été mises à jours.'));
                    next(action);
                }
            } catch (err) {
                console.error("SENDREGISTERCONSUMER err :", err);
                store.dispatch(setIsFormError(true, err));
            }
            break;
        case UPDATESECURITYACCOUNT :
            next(action);
            break;
        default:
            next(action);
    }
};
export default dashboardMiddleware;
