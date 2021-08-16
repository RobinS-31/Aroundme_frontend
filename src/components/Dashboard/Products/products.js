// == Import : npm
import React, { useEffect, useState } from 'react';

// == Import : local
import './style.scss';
import imgPlaceholder from '../../../assets/images/imageFake.webp';

const Products = ({ getProducts, categories, products, userData }) => {

    const [category, setCategory] = useState('');
    const [product, setProduct] = useState({});
    const [price, setPrice] = useState('0');
    const [measure, setMeasure] = useState('kg');
    const [description, setDescription] = useState('');
    const [productData, setProductData] = useState({});
    const [isFormError, setIsFormError] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        setProduct({});
    }, [category]);

    const handleOnClickAddButton = () => {
        if (category !== '' && product._id && price !== '0') {
            setProductData({
                category,
                imageUrl: product.imageUrl,
                name: product.name,
                price,
                measure,
                description
            });
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (Object.entries(productData).length !== 0) {
            setIsFormError(false);
            // Faire logique pour envoi au backend
        } else {
            setIsFormError(true);
        }
    };

    return (
        <div className={'dashboard_products'}>
            <div className={'dashboard_products_add'}>
                <h3>Ajouter un produit</h3>
                <div className={'dashboard_products_add_card'}>
                    <div className={'dashboard_products_add_card_productImg'}>
                        <img
                            src={Object.entries(product).length !== 0 ? `${process.env.REACT_APP_API_URL}${product.imageUrl}` : imgPlaceholder}
                            alt={'Représentation du produit'}
                            loading={'lazy'}
                        />
                    </div>
                    <form
                        className={'dashboard_products_add_card_form'}
                        onSubmit={handleSubmitForm}
                    >
                        <select
                            className={'dashboard_products_add_card_form_select'}
                            name={'category'}
                        >
                            <option value={''} onClick={() => setCategory('')}>Sélectionner une catégorie</option>
                            {userData.categories && categories.map(category => {
                                if (userData.categories.includes(category._id)) return <option key={category._id} value={category._id} onClick={() => setCategory(category._id)}>{category.name}</option>
                            })}
                        </select>
                        <select
                            className={'dashboard_products_add_card_form_select'}
                            name={'product'}
                            disabled={category === ''}
                        >
                            <option value={''} onClick={() => setProduct({})}>Sélectionner un type</option>
                            {products.map(product => {
                                if (product.category === category) return <option key={product._id} value={product._id} onClick={() => setProduct(product)}>{product.name}</option>
                            })}
                        </select>
                        <div className={'dashboard_products_add_card_form_priceContainer'}>
                            <input
                                name={'price'}
                                type={'number'}
                                placeholder={0}
                                step={0.1}
                                value={price}
                                onChange={e => setPrice(e.currentTarget.value)}
                            />
                            <select>
                                <option value={'kg'} onClick={() => setMeasure('kg')}>Kg</option>
                                <option value={'pcs'} onClick={() => setMeasure('pcs')}>Pcs</option>
                            </select>
                        </div>
                        <textarea
                            className={'dashboard_products_add_card_form_textarea'}
                            placeholder={'Description du produit (max 250 caractères).'}
                            maxLength={250}
                            rows={6}
                            value={description}
                            onChange={e => setDescription(e.currentTarget.value)}
                        />
                        <button
                            className={'dashboard_products_add_card_form_addButton'}
                            type={'submit'}
                            onClick={handleOnClickAddButton}
                        >
                            {/*{true
                                ? <div className={'spinnerLoader'}/>
                                : 'Ajouter'
                            }*/}
                            Ajouter
                        </button>
                        {isFormError &&
                            <div className={'dashboard_products_add_card_form_errorMessage'}>
                                <p>
                                    Veuillez indiquer, au moins :
                                    <br/>La catégorie du produit
                                    <br/>Le type du produit
                                    <br/>Le prix du produit
                                </p>
                            </div>
                        }
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
