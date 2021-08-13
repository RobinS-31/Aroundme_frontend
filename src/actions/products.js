export const GETCATEGORIES = 'GETCATEGORIES';
export const SETCATEGORIES = 'SETCATEGORIES';
export const GETPRODUCTS = 'GETPRODUCTS';
export const SETPRODUCTS = 'SETPRODUCTS';

export const getCategories = () => ({
    type: GETCATEGORIES
});
export const setCategories = (categories) => ({
    type: SETCATEGORIES,
    categories
});
export const getProducts = () => ({
    type: GETPRODUCTS
});
export const setProducts = (products) => ({
    type: SETPRODUCTS,
    products
});
