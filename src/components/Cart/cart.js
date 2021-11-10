// == Import : npm
import React, { useEffect, useState } from 'react';

// == Import : components
import CartItem from "./cartItem";
import Form from "../../containers/form";

// == Import : local
import { priceFormatted } from "../../utils/tools";
import './style.scss';

const Cart = ({ cartProduct, producersList, removeProductToCart }) => {

    const [cartFormated, setCartFormated] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (producersList.length) {
            setCartFormated([]);
            setTotalPrice(0);
            formatCart(cartProduct, producersList);
        }
    }, [cartProduct, producersList]);

    useEffect(() => {
        console.log(cartFormated);
    }, [cartFormated]);

    const formatCart = (cartData, producersData) => {
        Object.entries(cartData).forEach(([producerId, cartContent]) => {
            const producerInfo = producersData.find(producer => producer._id === producerId);
            const { _id, firstname, lastname, address, postcode, city, email, establishment, phone, siret } = producerInfo;

            const cartProductInfo = Object.entries(cartContent).map(([key, value]) => {
                let fullPrice;
                value.defaultMeasure === 'kg' && value.measure === 'g'
                    ? fullPrice = (parseFloat(value.quantity) / 1000) * parseFloat(value.price)
                    : fullPrice = parseFloat(value.quantity) * parseFloat(value.price);

                setTotalPrice(prevState => prevState + fullPrice);
                return {
                    productId: key,
                    fullPrice,
                    ...value
                };
            });

            setCartFormated(prevState => [
                ...prevState,
                {
                    _id,
                    firstname,
                    lastname,
                    address,
                    postcode,
                    city,
                    email,
                    establishment,
                    phone,
                    siret,
                    cart: cartProductInfo
                }
            ]);
        });
    };

    return (
        <section className={'section cart'}>
            <div className={'cartDetails'}>
                <h2 className={'title'}>Mon Panier</h2>
                <div>
                    {cartFormated.length > 0 && cartFormated.map(item => <CartItem key={item._id} item={item} priceFormatted={priceFormatted} removeProductToCart={removeProductToCart} />)}
                </div>
                <h3 className={'cartTotalPrice_title'}><span>Prix total :</span> {priceFormatted(totalPrice, 0, 2)}</h3>
            </div>
            <div>
                <h2 className={'title'}>Mes Informations</h2>
            </div>
        </section>
    );
};

export default Cart;
