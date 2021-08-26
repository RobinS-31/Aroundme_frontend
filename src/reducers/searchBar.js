import {
    SETADDRESSRESULT,
    SETADDRESSVALUE,
    SETCATEGORY,
    SETDISTANCE,
    SETDISTANCEORDURATION,
    SETDISPLAYMAP
} from "../actions/searchbar";

const initialState = {
    category: '',
    addressValue: '',
    addressResult: [],
    distanceUnit: 0,
    distanceMetric: 'distances',
    displayMap: false,
    distanceOrDuration: []
};

const searchBar = (state = initialState, action = {}) => {
    switch (action.type) {
        case SETADDRESSRESULT:
            return {
                ...state,
                addressResult: action.addressResult
            };
        case SETADDRESSVALUE:
            return {
                ...state,
                addressValue: action.addressValue
            };
        case SETCATEGORY:
            return {
                ...state,
                category: action.category
            };
        case SETDISTANCE:
            return {
                ...state,
                [action.name]: action.value
            };
        case SETDISTANCEORDURATION:
            return {
                ...state,
                distanceOrDuration: action.distanceOrDuration
            };
        case SETDISPLAYMAP:
            return {
                ...state,
                displayMap: action.bool
            };
        default: return state;
    }
};
export default searchBar;
