// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import App from "../components/App/app";
import { checkedIfLogged } from "../actions/login";
import { getDistanceOrDuration } from "../actions/searchbar";
import { getProducersList } from "../actions/producer";
import { getCategories } from "../actions/products";
import { saveCart, getCart } from "../actions/cart";

const mapStateToProps = (state, ownProps) => ({
    userLocation: state.user.location,
    userConnected: state.user.userConnected,
    distanceUnit: state.searchBar.distanceUnit,
    distanceMetric: state.searchBar.distanceMetric,
    cartProduct: state.cart.cartProduct,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({
    checkedIfLogged: () => {
        dispatch(checkedIfLogged());
    },
    getDistanceOrDuration: () => {
        dispatch(getDistanceOrDuration());
    },
    getProducersList: () => {
        dispatch(getProducersList());
    },
    getCategories: () => {
        dispatch(getCategories());
    },
    saveCart: () => {
        dispatch(saveCart());
    },
    getCart: () => {
        dispatch(getCart());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
