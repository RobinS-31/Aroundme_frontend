// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Cart from "../components/Cart/cart";
import { removeProductToCart } from "../actions/cart";

const mapStateToProps = (state, ownProps) => ({
    cartProduct: state.cart.cartProduct,
    producersList: state.producer.producersList,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({
    removeProductToCart: (producerId, productId) => {
        dispatch(removeProductToCart(producerId, productId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
