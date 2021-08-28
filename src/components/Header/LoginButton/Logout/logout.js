// == Import : npm
import React from 'react';
import { Link } from 'react-router-dom';

// == Import : components


// == Import : local
import './style.scss';

const Logout = ({ logOut, props }) => {
    const { handleDisplayLoginZone } = props;

    return (
        <div
            className={'logout'}
            tabIndex="0"
            onBlur={handleDisplayLoginZone}
        >
            <Link to={'/dashboard'}>
                <button className={'button logout_myAccount'} onClick={handleDisplayLoginZone}>
                    Mon Compte
                </button>
            </Link>
            <div className={'divider logout_divider'} />
            <button
                className={'button logout_disconnect'}
                onClick={logOut}
            >
                Déconnexion
            </button>
        </div>
    );
};

export default Logout;
