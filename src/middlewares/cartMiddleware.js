import { SAVECART, GETCART, setCart } from "../actions/cart";

const cartMiddleware = store => next => async action => {
    switch (action.type) {
        case SAVECART:
            try {
                const { cartProduct } = store.getState().cart;
                document.cookie = `cart=${JSON.stringify(cartProduct)}; sameSite=Strict; max-age=604800; path=/; ${process.env.NODE_ENV === "production" ? "secure" : ''}`;
                next(action);
            } catch (err) {
                console.error("SAVECART err :", err);
            }
            break;
        case GETCART:
            try {
                if (document.cookie.split(';').some((item) => item.trim().startsWith('cart='))) {
                    const cartCookie = document.cookie
                        .split('; ')
                        .find(row => row.startsWith('cart='))
                        .split('=')[1];

                    const cartCookieParsed = JSON.parse(cartCookie);
                    store.dispatch(setCart(cartCookieParsed));
                }
                next(action);
            } catch (err) {
                console.log("GETCART err :", err);
            }
            break;
        default:
            next(action);
    }
};
export default cartMiddleware;
