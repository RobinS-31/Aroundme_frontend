// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Dashboard from "../components/Dashboard/dashboard";
import { setInputDashboardFormValues } from "../actions/dashboard";

const mapStateToProps = (state, ownProps) => ({
    userConnected: state.user.userConnected,
    userData: state.user.userData,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({
    setInputDashboardFormValues: (data) => {
        dispatch(setInputDashboardFormValues(data))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
