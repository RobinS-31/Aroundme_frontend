// == Import : npm
import { combineReducers } from 'redux';

// == Import : components
import dashboard from "./dashboard";
import login from "./login";
import producer from "./producer";
import products from "./products";
import registerForm from "./registerForm";
import searchBar from "./searchBar";
import user from "./user";

const rootReducer = combineReducers({
    dashboard: dashboard,
    login: login,
    producer: producer,
    products: products,
    registerForm: registerForm,
    searchBar: searchBar,
    user: user
});

export default rootReducer;
