// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import ProducerShowCase from "../components/ProducerShowCase/producerShowCase";
import { getOneProducer, resetOneProducer } from "../actions/producer";

const mapStateToProps = (state, ownProps) => ({
    producerData: state.producer.producerData,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({
    getOneProducer: (id) => {
        dispatch(getOneProducer(id));
    },
    resetOneProducer: () => {
        dispatch(resetOneProducer());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProducerShowCase);
