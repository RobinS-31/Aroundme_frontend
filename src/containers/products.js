// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Products from "../components/Dashboard/Products/products";

import { getProducts } from "../actions/products";
import products from "../reducers/products";

const mapStateToProps = (state, ownProps) => ({
    categories: state.products.categories,
    products: state.products.products,
    userData: state.user.userData,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({
    getProducts: () => {
        dispatch(getProducts());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
