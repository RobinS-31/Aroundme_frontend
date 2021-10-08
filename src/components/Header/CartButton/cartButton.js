// == Import : npm
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

// == Import : local
import './style.scss';


const CartButton = ({ cartProduct }) => {
    return (
        <Link to={'/cart'}>
            <div className={'cartButton'}>
                <button className={'cartButton_button'}>
                    <FontAwesomeIcon className='cartButton_button_icon' icon={faShoppingBasket} />
                </button>
                <div
                    className={'cartButton_counter'}
                >
                    {Object.keys(cartProduct).length ? Object.keys(cartProduct).length : null}
                </div>
            </div>
        </Link>
    );
};
export default CartButton;
