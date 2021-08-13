import { SETCATEGORIES, SETPRODUCTS } from "../actions/products";

const initialState = {
    categories: [],
    products: []
};

const products = (state = initialState, action = {}) => {
    switch (action.type) {
        case SETCATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        case SETPRODUCTS:
            return {
                ...state,
                products: action.products
            };
        default: return state;
    }
};
export default products;
