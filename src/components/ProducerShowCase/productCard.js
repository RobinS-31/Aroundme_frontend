// == Import : npm
import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// == Import : local
import { priceFormatted } from "../../utils/tools";

const ProductCard = ({ product, addProductToCart, producerId }) => {

    const [quantity, setQuantity] = useState('');
    const [measure, setMeasure] = useState('g');
    const addToCart = useRef(null);
    const addedToCart = useRef(null);

    /**
     * Définit la valeur de "measure" sur "pcs" pour les produits ayant comme valeur de mesure "pcs".
     */
    useEffect(() => {
        if (product.measure === 'pcs') setMeasure('pcs');
    }, [product]);

    /**
     * Fonction déclenché lors de la soumission du formulaire lié à l'ajout d'un produit dans le "panier".
     * @param e
     */
    const handleOnClickAddToCartButton = (e) => {
        e.preventDefault();

        if (Number.isInteger(parseFloat(quantity))) {
            const dataProduct = {
                quantity,
                measure,
                price: product.price,
                defaultMeasure: product.measure,
                name: product.name,
                imageUrl: product.imageUrl,
                details: product.details,
                description: product.description,
                category: product.category
            };

            addProductToCart(product.id, producerId, dataProduct); // "Action" permettant d'ajouté les informations du produit dans le state du reducer "cart"
            setQuantity(''); // Réinitialise la valeur de "quantity" sur sa valeur initiale
            product.measure === 'pcs' ? setMeasure('pcs') : setMeasure('g'); // Réinitialise la valeur de "measure" sur sa valeur initiale
            addToCart.current.classList.replace('show', 'hide');
            addedToCart.current.classList.replace('hide', 'show');

            setTimeout(() => {
                addedToCart.current.classList.replace('show', 'hide');
                addToCart.current.classList.replace('hide', 'show');
            }, 2000)
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
            <form className={'producerShowCase_products_item_addToCart'}>
                <div className={'producerShowCase_products_item_addToCart_quantity'}>
                    <input
                        name={'quantity'}
                        type={'number'}
                        placeholder={"Quantité"}
                        step={1}
                        min={0}
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
                <button
                    className={'producerShowCase_products_item_addToCart_button'}
                    type={'submit'}
                    onClick={handleOnClickAddToCartButton}
                >
                    <span className={'show'} ref={addToCart}>Ajouter au panier</span>
                    <span className={'hide'} ref={addedToCart}>
                        <FontAwesomeIcon className={'button_icon'} icon={faCheckCircle} />
                        Produit ajouté
                    </span>
                </button>
            </form>
        </div>
    )
};

export default ProductCard;
