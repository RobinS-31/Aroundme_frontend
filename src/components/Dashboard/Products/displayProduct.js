// == Import : npm
import React from "react";

// == Import : local
import { priceFormatted } from "../../../utils/tools";

/**
 * Permet d'afficher une "carte" représentant un produit.
 * @param product - Données d'un produit, de la liste des produits du producteur.
 * @param handleSubmitRemoveProductForm - Fonction liée au clique sur le bouton "supprimer" du formulaire.
 * @param handleOnClickRemoveProductButton - Fonction liéé à la soumission du formulaire.
 * @returns {JSX.Element}
 */
const DisplayProduct = ({ product, handleSubmitRemoveProductForm, handleOnClickRemoveProductButton }) => {
    console.log("coucou");
    return (
        <form className={'dashboard_products_list_container_item'} onSubmit={handleSubmitRemoveProductForm}>
            <div className={'dashboard_products_list_container_item_productImg'}>
                <img
                    src={`${process.env.REACT_APP_API_URL}${product.imageUrl}`}
                    alt={'Représentation du produit'}
                    loading={'lazy'}
                />
            </div>
            <div className={'dashboard_products_list_container_item_productInfo'}>
                <p className={'dashboard_products_list_container_item_productInfo_name'}>{product.name}</p>
                <p className={'dashboard_products_list_container_item_productInfo_price'}>{priceFormatted(product.price)} / {product.measure}</p>
                {product.details.length !== 0 &&
                    <div className={'dashboard_products_list_container_item_productInfo_details'}>
                        <p>Détails du produit :</p>
                        <ul>
                            {product.details.map(detail => {
                                return <li key={detail}>- {detail}</li>
                            })}
                        </ul>
                    </div>
                }
                {product.description.length !== 0 &&
                    <div className={'dashboard_products_list_container_item_productInfo_description'}>
                        <p>Description :</p>
                        <p>{product.description}</p>
                    </div>
                }
            </div>
            <button
                className={'dashboard_products_list_container_item_removeButton'}
                type={'submit'}
                value={product.id}
                onClick={handleOnClickRemoveProductButton}
            >
                Supprimer
            </button>
        </form>
    );
};

export default React.memo(DisplayProduct);
