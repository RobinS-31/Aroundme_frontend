export const ADDPRODUCTTOCART = 'ADDPRODUCTTOCART';

export const addProductToCart = (id, quantity, measure) => ({
    type: ADDPRODUCTTOCART,
    id,
    quantity,
    measure
});
