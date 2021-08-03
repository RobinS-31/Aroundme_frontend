// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Home from "../components/Home/home";
import { getProducersList } from "../actions/producer";
import { getCategories } from "../actions/products";

const mapStateToProps = (state, ownProps) => ({
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({
    getProducersList: () => {
        dispatch(getProducersList());
    },
    getCategories: () => {
        dispatch(getCategories());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
