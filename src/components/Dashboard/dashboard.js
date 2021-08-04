// == Import : npm
import React, { useEffect } from 'react';

// == Import : components
import Producer from "../../containers/dashboardProducer";
import Customer from "../../containers/dashboardCustomer";

// == Import : local
import './style.scss';

const Dashboard = ({ userConnected, userData, setInputDashboardFormValues, props }) => {

    useEffect(() => {
        const userInfo = { ...userData };
        delete userInfo._id;
        delete userInfo.isProducer;
        delete userInfo.lat;
        delete userInfo.lon;
        delete userInfo.imageUrl;
        delete userInfo.products;
        setInputDashboardFormValues(userInfo);
    }, [])

    return (
        <div className='section dashboard'>
            {userConnected && userData.isProducer && <Producer userData={userData} />}
            {userConnected && !userData.isProducer && <Customer />}
        </div>
    );
};
export default Dashboard;
