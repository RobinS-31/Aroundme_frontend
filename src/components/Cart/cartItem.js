// == Import : npm
import React from "react";

// == Import : components
import CartItemProduct from "./cartItemProduct";

/**
 * Displays the contents of the basket from an object containing the information of a producer and the products, selected by the user, which are associated with it
 * @param {Object} item
 * @param {func} priceFormatted
 * @param {func} removeProductToCart
 * @returns {JSX.Element}
 */
const CartItem = ({ item, priceFormatted, removeProductToCart }) => (
    <div className={'cartDetails_item'}>
        <div className={'cartDetails_item_producerInfo'}>
            <h3>{item.firstname} {item.lastname}</h3>
            <p>{item.address} {item.postcode} {item.city}</p>
            <p>{item.establishment}</p>
        </div>
        <div className={'cartDetails_item_productsDetails'}>
            <table>
                <thead>
                <tr className={'cartDetails_item_productsDetails_row'}>
                    <th className={'cartDetails_item_productsDetails_cell thead product'}>Produit</th>
                    <th className={'cartDetails_item_productsDetails_cell thead quantity'}>Quantité</th>
                    <th className={'cartDetails_item_productsDetails_cell thead'}>Prix</th>
                </tr>
                </thead>
                <tbody>
                {item.cart.map(product => (
                    <CartItemProduct key={product.productId} itemId={item._id} product={product} priceFormatted={priceFormatted} removeProductToCart={removeProductToCart} />
                ))}
                </tbody>
            </table>
        </div>
    </div>
);
export default React.memo(CartItem);