// == Import : npm
import React, { useEffect } from 'react';

// == Import : local
import './style.scss';

const Cart = ({ cartProduct, producersList }) => {

    useEffect(() => {
        console.log(cartProduct);
        console.log(producersList);
    }, []);

    return (
        <div className={'section'}>
            <h2 className={'title'}>Mon Panier</h2>
        </div>
    );
};

export default Cart;
