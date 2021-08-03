import { SETUSERDATA, RESETUSERDATA, SETUSERLOCATION } from '../actions/user';

const initialState = {
    userConnected: false,
    userId: 0,
    userData: {},
    xsrfToken: null,
    location: {
        lat: '',
        lon: ''
    }
};

const user = (state = initialState, action = {}) => {
    switch (action.type) {
        case SETUSERDATA:
            return {
                ...state,
                userConnected: true,
                userId: action.userId,
                userData: action.userData,
                xsrfToken: action.xsrfToken
            };
        case SETUSERLOCATION:
            return {
                ...state,
                location: {
                    lat: action.lat,
                    lon: action.lon
                }
            }
        case RESETUSERDATA:
            return initialState;
        default: return state;
    }
};
export default user;
