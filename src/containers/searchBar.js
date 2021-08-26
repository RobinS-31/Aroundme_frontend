// == Import : npm
import { connect } from 'react-redux';

// == Import : components
import SearchBar from "../components/Home/SearchBar/searchBar";
import { getAddressResult, setAddressValue, setCategory, setDistance, setDisplayMap } from "../actions/searchbar";
import { setUserLocation } from "../actions/user";

const mapStateToProps = (state) => ({
    categoriesList: state.products.categories,
    addressResult: state.searchBar.addressResult,
    distanceUnit: state.searchBar.distanceUnit,
    distanceMetric: state.searchBar.distanceMetric,
    category: state.searchBar.category,
    addressValue: state.searchBar.addressValue,
    displayMap: state.searchBar.displayMap,
    userLocation: state.user.location
});

const mapDispatchToProps = (dispatch) => ({
    getAddressResult: () => {
        dispatch(getAddressResult());
    },
    setAddressValue: (addressValue) => {
        dispatch(setAddressValue(addressValue));
    },
    setCategory: (category) => {
        dispatch(setCategory(category));
    },
    setDistance: (name, value) => {
        dispatch(setDistance(name, value));
    },
    setUserLocation: (lon, lat) => {
        dispatch(setUserLocation(lon, lat));
    },
    setDisplayMap: (bool) => {
        dispatch(setDisplayMap(bool));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
