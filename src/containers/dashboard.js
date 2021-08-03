// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Dashboard from "../components/Dashboard/dashboard";

const mapStateToProps = (state, ownProps) => ({
    props: ownProps
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
