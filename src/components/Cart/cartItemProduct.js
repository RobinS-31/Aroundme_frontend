// == Import : npm
import React from "react";

/**
 * @callback priceFormatted
 * @param {number} price
 * @param {number} minDigits
 * @param {number} maxDigits
 * @returns {Intl.NumberFormat}
 */

/**
 * @callback removeProductToCart
 * @param {string} producerId
 * @param {string} productId
 */

/**
 *
 * @param {string} itemId
 * @param {Object} product
 * @param {priceFormatted} priceFormatted
 * @param {removeProductToCart} removeProductToCart
 * @returns {JSX.Element}
 */
const CartItemProduct = ({ itemId, product, priceFormatted, removeProductToCart }) => (
    <tr className={'cartDetails_item_productsDetails_row'}>
        <th className={'cartDetails_item_productsDetails_cell tbody product'}>{product.name}</th>
        <th className={'cartDetails_item_productsDetails_cell tbody quantity'}>{product.quantity} {product.measure}</th>
        <th className={'cartDetails_item_productsDetails_cell tbody'}>{priceFormatted(product.fullPrice, 0, 2)}</th>
        <th className={'cartDetails_item_productsDetails_cell tbody'}>
            <button
                className={'cartDetails_item_productsDetails_cell_removeButton'}
                onClick={() => removeProductToCart(itemId, product.productId)}
            >
                Supprimer
            </button>
        </th>
    </tr>
);
export default React.memo(CartItemProduct);