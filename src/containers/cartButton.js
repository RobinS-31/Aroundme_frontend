// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import CartButton from "../components/Header/CartButton/cartButton";

const mapStateToProps = (state, ownProps) => ({
    cartProduct: state.cart.cartProduct,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);
