// == Import : npm
import React from 'react';
import { Link } from 'react-router-dom';

// == Import : components
import LoginButton from "../../containers/loginButton";
import CartButton from "../../containers/cartButton";

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
                <CartButton />
                <LoginButton />
            </div>
        </div>
    );
};
export default React.memo(Header);
