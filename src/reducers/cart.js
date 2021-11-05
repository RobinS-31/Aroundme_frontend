import {ADDPRODUCTTOCART, REMOVEPRODUCTTOCART, SETCART} from '../actions/cart';

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
        case SETCART:
            return {
                ...state,
                cartProduct: action.cartData
            }
        case REMOVEPRODUCTTOCART:
            console.log(action);
            const tempState = { ...state.cartProduct };
            delete tempState[action.producerId][action.productId];
            if (Object.keys(tempState[action.producerId]).length === 0) {
                delete tempState[action.producerId];
            }

            return {
                ...state,
                cartProduct: Object.keys(tempState).length !== 0 ? tempState : {}
            };
        default: return state;
    }
};
export default cart;
