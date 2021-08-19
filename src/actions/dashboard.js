export const UPDATEUSER = 'UPDATEUSER';
export const UPDATEPRODUCER = 'UPDATEPRODUCER';
export const UPDATESECURITYACCOUNT = 'UPDATESECURITYACCOUNT';
export const UPDATEPRODUCERPRODUCTS = 'UPDATEPRODUCERPRODUCTS';
export const SETPRODUCERPRODUCTS = 'SETPRODUCERPRODUCTS';
export const ADDPRODUCT = 'ADDPRODUCT';
export const REMOVEPRODUCT = 'REMOVEPRODUCT';
export const SETISWAITINGPRODUCTSFORMVALIDATION = 'SETISWAITINGPRODUCTSFORMVALIDATION';
export const SETISPRODUCTSFORMVALIDATIONERROR = 'SETISPRODUCTSFORMVALIDATIONERROR';
export const SETISPRODUCTSFORMVALIDATED = 'SETISPRODUCTSFORMVALIDATED';

export const updateUser = () => ({
    type: UPDATEUSER
});
export const updateProducer = () => ({
    type: UPDATEPRODUCER
});
export const updateSecurityAccount = () => ({
    type: UPDATESECURITYACCOUNT
});
export const updateProducerProducts = () => ({
    type: UPDATEPRODUCERPRODUCTS
});
export const setProducerProducts = (producerProducts) => ({
    type: SETPRODUCERPRODUCTS,
    producerProducts
});
export const addProduct = (product) => ({
    type: ADDPRODUCT,
    product
});
export const removeProduct = (product) => ({
    type: REMOVEPRODUCT,
    product
});
export const setIsWaitingProductFormValidation = (bool) => ({
    type: SETISWAITINGPRODUCTSFORMVALIDATION,
    bool
});
export const setIsProductFormValidationError = (bool) => ({
    type: SETISPRODUCTSFORMVALIDATIONERROR,
    bool
});
export const setIsProductFormValidated = (bool) => ({
    type: SETISPRODUCTSFORMVALIDATED,
    bool
});
