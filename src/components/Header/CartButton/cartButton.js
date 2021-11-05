// == Import : npm
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

// == Import : local
import './style.scss';


const CartButton = ({ cartProduct }) => {
    const [cartProductLength, setCartProductLength] = useState(0);

    useEffect(() => {
        setCartProductLength(0);
        for (const producer in cartProduct) {
            setCartProductLength(prevState => prevState + Object.keys(cartProduct[producer]).length);
        }
    }, [cartProduct]);

    return (
        <Link to={'/cart'}>
            <div className={'cartButton'}>
                <button className={'cartButton_button'}>
                    <FontAwesomeIcon className='cartButton_button_icon' icon={faShoppingBasket} />
                </button>
                <div
                    className={'cartButton_counter'}
                >
                    {cartProductLength > 0 && cartProductLength}
                </div>
            </div>
        </Link>
    );
};
export default CartButton;
