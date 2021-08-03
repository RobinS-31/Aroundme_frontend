import { SETCATEGORIES } from "../actions/products";

const initialState = {
    categories: []
};

const products = (state = initialState, action = {}) => {
    switch (action.type) {
        case SETCATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        default: return state;
    }
};
export default products;
