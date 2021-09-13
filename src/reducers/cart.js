import { ADDPRODUCTTOCART } from '../actions/cart';

const initialState = {
    cartProduct: {}
};

const cart = (state = initialState, action = {}) => {
    switch (action.type) {
        case ADDPRODUCTTOCART:
            return {
                ...state,
                cartProduct: {
                    ...state.cartProduct,
                    [action.id]: [action.quantity, action.measure]
                }
            };
        default: return state;
    }
};
export default cart;
