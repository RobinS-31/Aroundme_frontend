export const ADDPRODUCTTOCART = 'ADDPRODUCTTOCART';
export const REMOVEPRODUCTTOCART = 'REMOVEPRODUCTTOCART';
export const SAVECART = 'SAVECART';
export const GETCART = 'GETCART';
export const SETCART = 'SETCART';

export const addProductToCart = (productId, producerId, dataProduct) => ({
    type: ADDPRODUCTTOCART,
    productId,
    producerId,
    dataProduct
});
export const removeProductToCart = (producerId, productId) => ({
    type: REMOVEPRODUCTTOCART,
    producerId,
    productId
});
export const saveCart = () => ({
    type: SAVECART
});
export const getCart = () => ({
    type: GETCART
});
export const setCart = (cartData) => ({
    type: SETCART,
    cartData
});