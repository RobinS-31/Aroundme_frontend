import {
    SETPRODUCERPRODUCTS,
    ADDPRODUCT,
    REMOVEPRODUCT,
    SETISWAITINGPRODUCTSFORMVALIDATION,
    SETISPRODUCTSFORMVALIDATIONERROR,
    SETISPRODUCTSFORMVALIDATED
} from "../actions/dashboard";

const initialState = {
    producerProducts: [],
    isWaitingProductsFormValidation: false,
    isProductsFormValidationError: false,
    isProductsFormValidated: false
};

const dashboard = (state = initialState, action = {}) => {
    switch (action.type) {
        case ADDPRODUCT:
            return {
                ...state,
                producerProducts: [...state.producerProducts, action.product]
            };
        case REMOVEPRODUCT:
            return {
              ...state,
              producerProducts: action.product
            };
        case SETPRODUCERPRODUCTS:
            return {
                ...state,
                producerProducts: action.producerProducts
            };
        case SETISWAITINGPRODUCTSFORMVALIDATION:
            return {
                ...state,
                isWaitingProductsFormValidation: action.bool
            };
        case SETISPRODUCTSFORMVALIDATIONERROR:
            return {
                ...state,
                isProductsFormValidationError: action.bool
            };
        case SETISPRODUCTSFORMVALIDATED:
            return {
                ...state,
                isProductsFormValidated: action.bool
            };
        default: return state;
    }
};
export default dashboard;
