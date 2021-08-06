// == Import : npm
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// == Import : components
import reducer from '../reducers';
import authMiddleware from '../middlewares/authMiddleware';
import dashboardMiddleware from "../middlewares/dashboardMiddleware";
import registerMiddleware from "../middlewares/registerMiddleware";
import producerMiddleware from "../middlewares/producerMiddleware";
import productsMiddleware from "../middlewares/productsMiddleware";
import searchbarMiddleware from "../middlewares/searchbarMiddleware";
import userMiddleware from "../middlewares/userMiddleware";

const enhancers = composeWithDevTools(
    applyMiddleware(
        authMiddleware,
        dashboardMiddleware,
        registerMiddleware,
        producerMiddleware,
        productsMiddleware,
        searchbarMiddleware,
        userMiddleware
    )
);

const store = createStore(
    reducer,
    enhancers,
);

export default store;
