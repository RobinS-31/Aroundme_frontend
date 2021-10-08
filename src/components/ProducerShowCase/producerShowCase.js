// == Import : npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// == Import : components
import ProductCard from "./productCard";

// == Import : local
import './style.scss';
import imgPlaceholder from '../../assets/images/imageFake.webp';

const ProducerShowCase = ({ producerData, getOneProducer, resetOneProducer, addProductToCart, props }) => {

    const location = useLocation();

    useEffect(() => {
        getOneProducer(location.state.id);
    }, [location]);

    useEffect(() => {
        return () => {
            resetOneProducer();
        }
    }, []);

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
                {producerData.length !== 0 && producerData.products.map(productData => <ProductCard product={productData} addProductToCart={addProductToCart} producerId={location.state.id} key={productData.id} />)}
            </div>
        </div>
    );
};
export default ProducerShowCase;
