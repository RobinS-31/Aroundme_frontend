import { SETPRODUDERSLIST, SETONEPRODUCER, RESETPRODUCERSLIST, RESETONEPRODUCER } from "../actions/producer";

const initialState = {
    producersList: [],
    producerData: []
};

const producer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SETPRODUDERSLIST:
            return {
                ...state,
                producersList: action.producersList
            };
        case SETONEPRODUCER:
            return {
                ...state,
                producerData: action.producerData
            }
        case RESETPRODUCERSLIST:
            return {
                ...state,
                producersList: []
            };
        case RESETONEPRODUCER:
            return {
                ...state,
                producerData: []
            };
        default: return state;
    }
};
export default producer;
