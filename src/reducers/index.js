// == Import : npm
import { combineReducers } from 'redux';

// == Import : components
import dashboard from "./dashboard";
import form from "./form";
import login from "./login";
import producer from "./producer";
import products from "./products";
import searchBar from "./searchBar";
import user from "./user";

const rootReducer = combineReducers({
    dashboard: dashboard,
    form: form,
    login: login,
    producer: producer,
    products: products,
    searchBar: searchBar,
    user: user
});

export default rootReducer;
