// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import MapApi from "../components/Home/Map/MapAPI/mapApi";

const mapStateToProps = (state, ownProps) => ({
    userLocation: state.user.location,
    userData: state.user.userData,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MapApi);
