export const SETUSERDATA = 'SETUSERDATA';
export const RESETUSERDATA = 'RESETUSERDATA';
export const GETUSERLOCATION = 'GETUSERLOCATION';
export const SETUSERLOCATION = 'SETUSERLOCATION';

export const setUserData = (userId, userData, xsrfToken) => ({
    type: SETUSERDATA,
    userId,
    userData,
    xsrfToken
});
export const getUserLocation = () => ({
    type: GETUSERLOCATION
});
export const setUserLocation = (lon, lat) => ({
    type: SETUSERLOCATION,
    lon,
    lat
});
export const resetUserData = () => ({
    type: RESETUSERDATA
});
