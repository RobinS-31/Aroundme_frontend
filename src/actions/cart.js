export const ADDPRODUCTTOCART = 'ADDPRODUCTTOCART';
export const SAVECART = 'SAVECART';

export const addProductToCart = (productId, producerId, dataProduct) => ({
    type: ADDPRODUCTTOCART,
    productId,
    producerId,
    dataProduct
});
export const saveCart = () => ({
    type: SAVECART
});
