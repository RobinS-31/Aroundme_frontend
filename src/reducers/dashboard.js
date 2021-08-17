import { SETPRODUCTDATA } from "../actions/dashboard";

const initialState = {
    productDataToAdd: {}
};

const dashboard = (state = initialState, action = {}) => {
    switch (action.type) {
        case SETPRODUCTDATA:
            return {
                ...state,
                productDataToAdd: action.productData
            };
        default: return state;
    }
};
export default dashboard;
