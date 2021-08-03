// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import ProducersList from "../components/Home/Map/ProducersList/producersList";

const mapStateToProps = (state, ownProps) => ({
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ProducersList);
