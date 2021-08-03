export const GETADDRESSRESULT = 'GETADDRESSRESULT';
export const SETADDRESSRESULT = 'SETADDRESSRESULT';
export const SETADDRESSVALUE = 'SETADDRESSVALUE';
export const SETCATEGORY = 'SETCATEGORY';
export const SETDISTANCE = 'SETDISTANCE';
export const GETDISTANCEORDURATION = 'GETDISTANCEORDURATION';
export const SETDISTANCEORDURATION = 'SETDISTANCEORDURATION';

export const getAddressResult = () => ({
    type: GETADDRESSRESULT
});
export const setAddressResult = (addressResult) => ({
    type: SETADDRESSRESULT,
    addressResult
});
export const setAddressValue = (addressValue) => ({
    type: SETADDRESSVALUE,
    addressValue
});
export const setCategory = (category) => ({
    type: SETCATEGORY,
    category
});
export const setDistance = (name, value) => ({
    type: SETDISTANCE,
    name,
    value
});
export const getDistanceOrDuration = () => ({
    type: GETDISTANCEORDURATION
});
export const setDistanceOrDuration = (distanceOrDuration) => ({
    type: SETDISTANCEORDURATION,
    distanceOrDuration
});
