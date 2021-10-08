export const ADDPRODUCTTOCART = 'ADDPRODUCTTOCART';

export const addProductToCart = (productId, producerId, dataProduct) => ({
    type: ADDPRODUCTTOCART,
    productId,
    producerId,
    dataProduct
});
