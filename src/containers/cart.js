// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Cart from "../components/Cart/cart";

const mapStateToProps = (state, ownProps) => ({
    cartProduct: state.cart.cartProduct,
    producersList: state.producer.producersList,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
