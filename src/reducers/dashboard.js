import { SETINITIALDASHBOARDFORMVALUES } from "../actions/dashboard";

const initialState = {
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    postcode: '',
    phone: '',
    establishment: '',
    job: '',
    siret: '',
    description: '',
    imageFile: [],
    email: '',
    location: {
        lat: '',
        lon: ''
    },
    categories: [],
};

const Dashboard = (state = initialState, action = {}) => {
    switch (action.type) {
        case SETINITIALDASHBOARDFORMVALUES:
            return {
                ...state,
                ...action.data
            }
        default: return state;
    }
};
export default Dashboard;
