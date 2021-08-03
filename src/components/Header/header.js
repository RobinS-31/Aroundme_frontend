// == Import : npm
import React from 'react';
import { Link } from 'react-router-dom';

// == Import : components
import LoginButton from "../../containers/loginButton";

// == Import : local
import './style.scss';

const Header = () => {
    return (
        <div className='header'>
            <div className='header_title'>
                <Link to='/'>
                    <p>AroundMe</p>
                </Link>
            </div>
            <div className={'header_nav'}>
                <LoginButton />
            </div>
        </div>
    );
};
export default Header;
