// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Products from "../components/Dashboard/Products/products";

import { getProducts } from "../actions/products";
import { setProductData, addProduct } from "../actions/dashboard";

const mapStateToProps = (state, ownProps) => ({
    categories: state.products.categories,
    products: state.products.products,
    userData: state.user.userData,
    productData: state.dashboard.productDataToAdd,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({
    getProducts: () => {
        dispatch(getProducts());
    },
    setProductData: (productData) => {
        dispatch(setProductData(productData));
    },
    addProduct: () => {
        dispatch(addProduct());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
