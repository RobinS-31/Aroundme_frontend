import { SAVECART } from "../actions/cart";

const cartMiddleware = store => next => async action => {
    switch (action.type) {
        case SAVECART:
            try {
                const { cartProduct } = store.getState().cart;
                console.log("cartProduct :", cartProduct);
                console.log("process.env.NODE_ENV :", process.env.NODE_ENV);

                document.cookie = `cart=${JSON.stringify(cartProduct)}; sameSite=Strict; max-age=604800; path=/; ${process.env.NODE_ENV === "production" ? "secure" : ''}`;
            } catch (err) {
                console.error("SAVECART err :", err);
            }
            break;
        default:
            next(action);
    }
};
export default cartMiddleware;
