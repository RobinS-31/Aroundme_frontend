import axios from 'axios';
import { GETCATEGORIES, setCategories } from "../actions/products";

const productsMiddleware = store => next => async action => {
    switch (action.type) {
        case GETCATEGORIES:
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/categories/getcategories`);
                if (response.status === 200) store.dispatch(setCategories(response.data));
                next(action);
            } catch (err) {
                console.error("GETCATEGORIES err :", err);
            }
            break;
        default:
            next(action);
    }
};
export default productsMiddleware;
