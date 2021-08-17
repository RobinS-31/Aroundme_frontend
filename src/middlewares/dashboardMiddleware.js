import axios from 'axios';

import {
    setFormRequestIsValidated,
    setSecurityFormRequestIsValidated,
    setIsFormError,
    setIsSecurityFormError,
    setIsWaitingFormValidation,
    setIsWaitingSecurityFormValidation
} from "../actions/form";
import { UPDATEUSER, UPDATEPRODUCER, UPDATESECURITYACCOUNT, ADDPRODUCT } from "../actions/dashboard";
import { setUserData } from "../actions/user";

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
        categories
    } = store.getState().form;

    const { userData, userId, xsrfToken } = store.getState().user;
    const { productDataToAdd } = store.getState().dashboard;

    switch (action.type) {
        case UPDATEUSER :
            try {
                const userInfo = {
                    firstname,
                    lastname,
                    address,
                    city,
                    postcode,
                    phone,
                    email,
                    xsrfToken,
                    userId
                };

                const response = await axios.put(
                    `${process.env.REACT_APP_API_URL}api/dashboard/updateuser`,
                    userInfo,
                    {
                        'withCredentials': true,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                        }
                    }
                );

                if (response.status === 200) {
                    store.dispatch(setUserData(response.data._id, response.data, xsrfToken));
                    store.dispatch(setIsWaitingFormValidation(false));
                    store.dispatch(setFormRequestIsValidated(true, 'Vos informations ont été mises à jours.'));
                    next(action);
                }
            } catch (err) {
                console.error("UPDATEUSER err :", err);
                store.dispatch(setIsWaitingFormValidation(false));
                store.dispatch(setIsFormError(true, "Erreur dans la mise à jour de vos informations, veuillez éssayer à nouveau."));
            }
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
                console.error("UPDATEPRODUCER err :", err);
                store.dispatch(setIsWaitingFormValidation(false));
                store.dispatch(setIsFormError(true, "Erreur dans la mise à jour de vos informations, veuillez éssayer à nouveau."));
            }
            break;
        case UPDATESECURITYACCOUNT :
            try {
                const accountData = {
                    password,
                    oldPassword,
                    isProducer: userData.isProducer,
                    xsrfToken,
                    userId
                };

                const response = await axios.put(
                    `${process.env.REACT_APP_API_URL}api/dashboard/updatepasswordaccount`,
                    accountData,
                    {
                        'withCredentials': true,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                        }
                    }
                );

                if (response.status === 200) {
                    store.dispatch(setIsWaitingSecurityFormValidation(false));
                    store.dispatch(setSecurityFormRequestIsValidated(true, 'Votre mot de passe à été mis à jour.'));
                    next(action);
                }
            } catch (err) {
                console.error("UPDATESECURITYACCOUNT err :", err);
                store.dispatch(setIsWaitingSecurityFormValidation(false));
                store.dispatch(setIsSecurityFormError(true, "Erreur dans la mise à jour du mot de passe, veuillez éssayer à nouveau."));
            }
            break;
        case ADDPRODUCT:
            try {
                const data = {
                    producerProducts: [
                        ...userData.products,
                        productDataToAdd
                    ],
                    xsrfToken,
                    userId
                };

                const response = await axios.put(
                    `${process.env.REACT_APP_API_URL}api/dashboard/addproducttoproducer`,
                    data,
                    {
                        'withCredentials': true,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                        }
                    }
                );

                console.log(response);

            } catch (err) {
                console.error("ADDPRODUCT err :", err);
            }
            break;
        default:
            next(action);
    }
};
export default dashboardMiddleware;
