// == Import : npm
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// == Import : components


// == Import : local
import './style.scss';
import { priceFormatted } from '../../utils/tools';
import imgPlaceholder from '../../assets/images/imageFake.webp';

const ProducerShowCase = ({ producerData, getOneProducer, resetOneProducer, props }) => {
    const location = useLocation();

    useEffect(() => {
        getOneProducer(location.state.id);
    }, [location]);

    useEffect(() => {
        return () => {
            resetOneProducer();
        }
    }, []);

    const displayProducts = (product) => {
        return (
            <div className={'producerShowCase_products_item'} key={product.id}>
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
            </div>
        )
    };

    return (
        <div className='section producerShowCase'>
            <div className='producerShowCase_info'>
                <div className='producerShowCase_info_picture'>
                    <img
                        src={producerData.length !== 0 ? `${process.env.REACT_APP_API_URL}${producerData.imageUrl[0]}` : imgPlaceholder}
                        alt={'Représentation du producteur'}
                        loading={'lazy'}
                    />
                </div>
                <div className='producerShowCase_info_data'>
                    <div className='producerShowCase_info_data_item'>
                        <span>Nom </span>
                        {producerData.length !== 0 && <p>{producerData.firstname} {producerData.lastname}</p>}
                    </div>
                    <div className='producerShowCase_info_data_item'>
                        <span>Adresse</span>
                        {producerData.length !== 0 && <p>{producerData.address} {producerData.postcode} {producerData.city}</p>}
                    </div>
                    <div className='producerShowCase_info_data_item'>
                        <span>Email</span>
                        {producerData.length !== 0 && <p>{producerData.email}</p>}
                    </div>
                    <div className='producerShowCase_info_data_item'>
                        <span>Téléphone</span>
                        {producerData.length !== 0 && <p>{producerData.phone}</p>}
                    </div>
                    <div className='producerShowCase_info_data_item'>
                        <span>Etablissement</span>
                        {producerData.length !== 0 && <p>{producerData.establishment}</p>}
                    </div>
                    <div className='producerShowCase_info_data_item'>
                        <span>Métier</span>
                        {producerData.length !== 0 && <p>{producerData.job}</p>}
                    </div>
                    <div className='producerShowCase_info_data_item description'>
                        <span>Description</span>
                        {producerData.length !== 0 && <p>{producerData.description}</p>}
                    </div>
                </div>
            </div>
            <div className='producerShowCase_products'>
                {producerData.length !== 0 && producerData.products.map(productData => displayProducts(productData))}
            </div>
        </div>
    );
};
export default ProducerShowCase;
