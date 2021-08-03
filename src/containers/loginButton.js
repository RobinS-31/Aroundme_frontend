// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import LoginButton from "../components/Header/LoginButton/loginButton";

const mapStateToProps = (state, ownProps) => ({
    userConnected: state.user.userConnected
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
