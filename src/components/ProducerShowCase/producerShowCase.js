// == Import : npm
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";

// == Import : components


// == Import : local
import './style.scss';

const ProducerShowCase = ({ producerData, getOneProducer, resetOneProducer, props }) => {
    const location = useLocation();

    useEffect(() => {
        getOneProducer(location.state.id);
    }, [location]);

    useEffect(() => {
        console.log("producerData :", producerData);

    }, [producerData]);

    useEffect(() => {
        return () => {
            resetOneProducer();
        }
    }, []);

    const displayProducts = (product) => {
        return (
            <div className="producerShowCase_products_containerItem" key={product._id}>
                <div className="producerShowCase_products_item">
                    <div className="producerShowCase_products_item_picture">
                        <img
                            src={`${process.env.REACT_APP_API_URL}${product.imageUrl}`}
                            alt={'Représentation du produit'}
                            loading={'lazy'}
                        />
                    </div>
                    <div className="producerShowCase_products_item_divider" />
                    <div className="producerShowCase_products_item_info">
                        <div className="producerShowCase_products_item_info_name">
                            {product.name}
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className="section producerShowCase">
            {producerData.length !== 0 &&
                <>
                    <div className="producerShowCase_info">
                        <div className="producerShowCase_info_picture">
                            <img
                                src={`${process.env.REACT_APP_API_URL}${producerData.imageUrl[0]}`}
                                alt={'Représentation du producteur'}
                                loading={'lazy'}
                            />
                        </div>
                        <div className="producerShowCase_info_data">
                            <div className="producerShowCase_info_data_item">
                                <span>Nom </span>
                                <p>{producerData.firstname} {producerData.lastname}</p>
                            </div>
                            <div className="producerShowCase_info_data_item">
                                <span>Adresse</span>
                                <p>{producerData.address} {producerData.postcode} {producerData.city}</p>
                            </div>
                            <div className="producerShowCase_info_data_item">
                                <span>Email</span>
                                <p>{producerData.email}</p>
                            </div>
                            <div className="producerShowCase_info_data_item">
                                <span>Téléphone</span>
                                <p>{producerData.phone}</p>
                            </div>
                            <div className="producerShowCase_info_data_item">
                                <span>Etablissement</span>
                                <p>{producerData.establishment}</p>
                            </div>
                            <div className="producerShowCase_info_data_item">
                                <span>Métier</span>
                                <p>{producerData.job}</p>
                            </div>
                            <div className="producerShowCase_info_data_item description">
                                <span>Description</span>
                                <p>{producerData.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="producerShowCase_products">
                        {/*{ producerData.productsData.map(productData => displayProducts(productData)) }*/}
                    </div>
                </>
            }
        </div>
    );
};
export default ProducerShowCase;
