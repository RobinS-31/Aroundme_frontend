// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Logout from "../components/Header/LoginButton/Logout/logout";
import { logOut } from '../actions/login';

const mapStateToProps = (state, ownProps) => ({
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({
    logOut: () => {
        dispatch(logOut());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
