// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import ProducerShowCase from "../components/ProducerShowCase/producerShowCase";
import { getOneProducer, resetOneProducer } from "../actions/producer";
import { addProductToCart } from '../actions/cart';

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
    },
    addProductToCart: (productId, producerId, dataProduct) => {
        dispatch(addProductToCart(productId, producerId, dataProduct))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProducerShowCase);
