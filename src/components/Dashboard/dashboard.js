// == Import : npm
import React from 'react';

// == Import : components
import Form from "../../containers/form";

// == Import : local
import './style.scss';

const Dashboard = () => {
    return (
        <div className='section dashboard'>
            <h2 className={'title'}>Informations</h2>
            <Form />
        </div>
    );
};
export default Dashboard;
