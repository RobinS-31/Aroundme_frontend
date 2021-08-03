// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import App from "../components/App/app";
import { checkedIfLogged } from "../actions/login";
import { getDistanceOrDuration } from "../actions/searchbar";

const mapStateToProps = (state, ownProps) => ({
    userLocation: state.user.location,
    userConnected: state.user.userConnected,
    distanceUnit: state.searchBar.distanceUnit,
    distanceMetric: state.searchBar.distanceMetric,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({
    checkedIfLogged: () => {
        dispatch(checkedIfLogged());
    },
    getDistanceOrDuration: () => {
        dispatch(getDistanceOrDuration());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
