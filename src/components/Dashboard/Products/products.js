// == Import : npm
import React, { useEffect, useState } from 'react';

// == Import : local
import './style.scss';

const Products = ({ getProducts, categories, products }) => {

    const [category, setCategory] = useState(null);
    const [product, setProduct] = useState({});

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        setProduct({});
    }, [category]);

    return (
        <div className={'dashboard_products'}>
            <div className={'dashboard_products_add'}>
                <h3>Ajouter un produit</h3>
                <div className={'dashboard_products_add_card'}>
                    <div className={'dashboard_products_add_card_productImg'}>
                        {Object.entries(product).length !== 0 &&
                            <img
                                src={`${process.env.REACT_APP_API_URL}${product.imageUrl}`}
                                alt={'Représentation du produit'}
                                loading={'lazy'}
                            />
                        }
                    </div>
                    <form className={'dashboard_products_add_card_form'}>
                        <select
                            className={'dashboard_products_add_card_form_select'}
                            name={'category'}
                            id={'category'}
                            onChange={e => setCategory(e.currentTarget.value)}
                        >
                            <option value={''}>Sélectionner une catégorie</option>
                            {categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}
                        </select>
                        <select
                            className={'dashboard_products_add_card_form_select'}
                            name={'product'}
                            id={'product'}
                            disabled={category === "" || category === null}
                        >
                            <option value={''} onClick={() => setProduct({})}>Sélectionner un type</option>
                            {products.map(product => {
                                if (product.category === category) {
                                    return <option key={product._id} value={product._id} onClick={() => setProduct(product)}>{product.name}</option>
                                }
                            })}
                        </select>
                    </form>
                </div>
            </div>
            <div className={'dashboard_products_list'}>
                <h3>Gérer mes produits</h3>
            </div>
        </div>
    );
};
export default Products;
