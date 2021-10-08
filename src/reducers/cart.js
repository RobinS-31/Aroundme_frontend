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
                    [action.producerId]: {
                        ...state.cartProduct[action.producerId],
                        [action.productId]: action.dataProduct
                    }
                }
            };
        default: return state;
    }
};
export default cart;
