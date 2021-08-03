// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Map from "../components/Home/Map/map";

const mapStateToProps = (state, ownProps) => ({
    producersList: state.producer.producersList,
    distanceUnit: state.searchBar.distanceUnit,
    distanceMetric: state.searchBar.distanceMetric,
    category: state.searchBar.category,
    distanceOrDuration: state.searchBar.distanceOrDuration,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
