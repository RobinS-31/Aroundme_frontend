// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Info from "../components/Dashboard/Info/info";
import { getCategories } from "../actions/products";

const mapStateToProps = (state, ownProps) => ({
    firstname: state.dashboard.firstname,
    lastname: state.dashboard.lastname,
    address: state.dashboard.address,
    city: state.dashboard.city,
    postcode: state.dashboard.postcode,
    phone: state.dashboard.phone,
    establishment: state.dashboard.establishment,
    job: state.dashboard.job,
    siret: state.dashboard.siret,
    description: state.dashboard.description,
    imageFile: state.dashboard.imageFile,
    email: state.dashboard.email,
    categoriesList: state.products.categories,
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({
    getCategories: () => {
        dispatch(getCategories());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);
