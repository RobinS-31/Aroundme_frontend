import axios from 'axios';
import { GETUSERLOCATION, setUserLocation } from "../actions/user";
import { setAddressValue } from "../actions/searchbar";

const userMiddleware = store => next => async action => {
    const { userData: { address, postcode, city } } = store.getState().user;

    switch (action.type) {
        case GETUSERLOCATION:
            try {
                const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${address}&postcode=${postcode}&city=${city}`);

                if (response.status === 200) {
                    const result = response.data.features[0].geometry.coordinates;
                    store.dispatch(setUserLocation(result[0], result[1]));
                    store.dispatch(setAddressValue(`${address} ${postcode} ${city}`))
                    next(action);
                }
            } catch (err) {
                console.error("GETUSERLOCATION err :", err);
            }
            break;
        default:
            next(action);
    }
};
export default userMiddleware;
