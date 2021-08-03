import axios from 'axios';
import { GETONEPRODUCER, GETPRODUCERSLIST, setProducersList, setOneProducer } from "../actions/producer";

const producerMiddleware = store => next => async action => {
    switch (action.type) {
        case GETPRODUCERSLIST:
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/producers/getproducer`);
                if (response.status === 200) store.dispatch(setProducersList(response.data));

                next(action);
            } catch (err) {
                console.error("GETPRODUCERSLIST err :", err);
            }
            break;
        case GETONEPRODUCER:
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/producers/getoneproducer/${action.id}`);
                if (response.status === 200) store.dispatch(setOneProducer(response.data));

                next(action);
            } catch (err) {
                console.error("GETONEPRODUCER err :", err);
            }
            break;
        default:
            next(action);
    }
};
export default producerMiddleware;
