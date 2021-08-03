import axios from 'axios';
import { GETADDRESSRESULT, GETDISTANCEORDURATION, setDistanceOrDuration, setAddressResult } from "../actions/searchbar";

const searchbarMiddleware = store => next => async action => {
    switch (action.type) {
        case GETADDRESSRESULT:
            try {
                const { addressValue } = store.getState().searchBar;
                const formatResults = [];

                const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${addressValue}`)

                const results = response.data.features;
                results.map((result) => formatResults.push({
                    'key': result.geometry.coordinates[0] + result.geometry.coordinates[1] + (Math.random() * ((999 - 1) + 1)),
                    'title': result.properties.label,
                    'location': {'lat': result.geometry.coordinates[1], 'lon': result.geometry.coordinates[0]},
                    'name': result.properties.name ? result.properties.name : '',
                    'housenumber': result.properties.housenumber ? result.properties.housenumber : '',
                    'street': result.properties.street ? result.properties.street : '',
                    'city': result.properties.city ? result.properties.city : '',
                    'postcode': result.properties.postcode ? result.properties.postcode : '',
                }))

                store.dispatch(setAddressResult(formatResults))

                next(action);
            } catch (err) {
                console.error(err);
            }
            break;
        case GETDISTANCEORDURATION:
            try {
                const { producersList } = store.getState().producer;
                const { location } = store.getState().user;
                const { distanceMetric } = store.getState().searchBar;
                const userAndProducerLocation = [location, ...producersList];

                const response = await axios.post(
                    'https://api.openrouteservice.org/v2/matrix/driving-car',
                    {
                        'locations': userAndProducerLocation.map(dataLoc => [dataLoc.lon,dataLoc.lat]),
                        'metrics':["distance","duration"]
                    },
                    {
                        headers: {
                            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                            'Content-Type': 'application/json',
                            'Authorization': '5b3ce3597851110001cf62482b985020781a48dfaeb01b502111ce36'
                        }
                    }
                );

                if (response.status === 200) {
                    const result = response.data[distanceMetric][0];
                    result.shift();
                    store.dispatch(setDistanceOrDuration(result));
                    next(action);
                }
            } catch (err) {
                console.error(err);
            }
            break;
        default:
            next(action);
    }
};
export default searchbarMiddleware;
