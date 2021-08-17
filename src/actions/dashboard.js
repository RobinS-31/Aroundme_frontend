export const UPDATEUSER = 'UPDATEUSER';
export const UPDATEPRODUCER = 'UPDATEPRODUCER';
export const UPDATESECURITYACCOUNT = 'UPDATESECURITYACCOUNT';
export const SETPRODUCTDATA = 'SETPRODUCTDATA';
export const ADDPRODUCT = 'ADDPRODUCT';

export const updateUser = () => ({
    type: UPDATEUSER
});
export const updateProducer = () => ({
    type: UPDATEPRODUCER
});
export const updateSecurityAccount = () => ({
    type: UPDATESECURITYACCOUNT
});
export const setProductData = (productData) => ({
    type: SETPRODUCTDATA,
    productData
});
export const addProduct = () => ({
    type: ADDPRODUCT
});
