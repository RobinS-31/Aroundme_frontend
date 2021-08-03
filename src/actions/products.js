export const GETCATEGORIES = 'GETCATEGORIES';
export const SETCATEGORIES = 'SETCATEGORIES';

export const getCategories = () => ({
    type: GETCATEGORIES
});
export const setCategories = (categories) => ({
    type: SETCATEGORIES,
    categories
});
