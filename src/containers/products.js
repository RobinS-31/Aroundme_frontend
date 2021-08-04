// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Products from "../components/Dashboard/Products/products";

const mapStateToProps = (state, ownProps) => ({
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
