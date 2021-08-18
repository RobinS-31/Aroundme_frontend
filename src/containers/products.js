// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Products from "../components/Dashboard/Products/products";

import { getProducts } from "../actions/products";
import {
    updateProducerProducts,
    setProducerProducts,
    addProduct,
    setIsWaitingProductFormValidation,
    setIsProductFormValidationError,
    setIsProductFormValidated
} from "../actions/dashboard";

const mapStateToProps = (state, ownProps) => ({
    categories: state.products.categories,
    products: state.products.products,
    userData: state.user.userData,
    isWaitingProductsFormValidation: state.dashboard.isWaitingProductsFormValidation,
    isProductsFormValidationError: state.dashboard.isProductsFormValidationError,
    isProductsFormValidated: state.dashboard.isProductsFormValidated,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({
    getProducts: () => {
        dispatch(getProducts());
    },
    updateProducerProducts: () => {
        dispatch(updateProducerProducts());
    },
    setProducerProducts: (producerProducts) => {
        dispatch(setProducerProducts(producerProducts))
    },
    addProduct: (product) => {
        dispatch(addProduct(product));
    },
    setIsWaitingProductFormValidation: (bool) => {
        dispatch(setIsWaitingProductFormValidation(bool))
    },
    setIsProductFormValidationError: (bool) => {
        dispatch(setIsProductFormValidationError(bool))
    },
    setIsProductFormValidated: (bool) => {
        dispatch(setIsProductFormValidated(bool))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
