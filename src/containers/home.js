// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import Home from "../components/Home/home";

const mapStateToProps = (state) => ({
    displayMap: state.searchBar.displayMap,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
