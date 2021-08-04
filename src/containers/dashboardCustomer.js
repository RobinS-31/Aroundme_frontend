// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Customer from "../components/Dashboard/Customer/customer";

const mapStateToProps = (state, ownProps) => ({
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
