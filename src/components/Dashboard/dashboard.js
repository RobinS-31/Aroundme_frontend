// == Import : npm
import React, { useEffect } from 'react';

// == Import : components
import Info from "../../containers/info";
import Products from "../../containers/products";

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
    }, [userData, setInputDashboardFormValues])

    return (
        <div className='section dashboard'>
            {userConnected && <Info userData={userData} />}
            {userConnected && userData.isProducer && <Products />}
        </div>
    );
};
export default Dashboard;
