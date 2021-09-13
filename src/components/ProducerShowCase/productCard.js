// == Import : npm
import React, { useEffect, useState } from 'react';

// == Import : local
import { priceFormatted } from "../../utils/tools";

const ProductCard = ({ product, addProductToCart }) => {
    const [quantity, setQuantity] = useState('');
    const [measure, setMeasure] = useState('g');

    useEffect(() => {
        if (product.measure === 'pcs') setMeasure('pcs');
    }, [product]);

    const handleOnClickAddToCartButton = () => {
        if (quantity !== '') {
            addProductToCart(product.id, quantity, measure);
            setQuantity('');
            product.measure === 'pcs' ? setMeasure('pcs') : setMeasure('g');
        }
    };

    return (
        <div className={'producerShowCase_products_item'}>
            <div className={'producerShowCase_products_item_picture'}>
                <img
                    src={`${process.env.REACT_APP_API_URL}${product.imageUrl}`}
                    alt={'Représentation du produit'}
                    loading={'lazy'}
                />
            </div>
            <div className={'producerShowCase_products_item_info'}>
                <p className={'producerShowCase_products_item_info_name'}>
                    {product.name}
                </p>
                <p className={'producerShowCase_products_item_info_price'}>
                    {priceFormatted(product.price)} / {product.measure}
                </p>
                {product.details.length !== 0 &&
                <div className={'producerShowCase_products_item_info_details'}>
                    <p>Détails du produit :</p>
                    <ul>
                        {product.details.map(detail => {
                            return <li key={detail}>- {detail}</li>
                        })}
                    </ul>
                </div>
                }
                {product.description.length !== 0 &&
                <div className={'producerShowCase_products_item_info_description'}>
                    <p>Description :</p>
                    <p>{product.description}</p>
                </div>
                }
            </div>
            <div className={'producerShowCase_products_item_addToCart'}>
                <div className={'producerShowCase_products_item_addToCart_quantity'}>
                    <input
                        name={'quantity'}
                        type={'number'}
                        placeholder={"Quantité"}
                        step={1}
                        value={quantity}
                        onChange={e => setQuantity(e.currentTarget.value)}
                    />
                    <select
                        name={'measure'}
                        value={measure}
                        onChange={() => {}}
                    >
                        {product.measure !== 'pcs'
                            ?
                                <>
                                    <option value={'g'} onClick={() => setMeasure('g')}>g</option>
                                    <option value={'kg'} onClick={() => setMeasure('kg')}>Kg</option>
                                </>
                            :
                                <option value={'pcs'} onClick={() => setMeasure('pcs')}>Pcs</option>
                        }
                    </select>
                </div>
                <button className={'producerShowCase_products_item_addToCart_button'} onClick={handleOnClickAddToCartButton}>Ajouter au panier</button>
            </div>
        </div>
    )
};

export default ProductCard;
