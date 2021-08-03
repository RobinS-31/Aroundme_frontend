// == Import : npm
import React from 'react';
import { Link } from 'react-router-dom';

// == Import : local
import './style.scss';
import ProducerImage from '../../assets/images/producer.webp';
import ConsumerImage from '../../assets/images/consumer.webp';

const RegisterAccount = () => {
    return (
        <div className={'registerAccount'}>
            <h2 className={'registerAccount_title'}>Vous êtes ...</h2>
            <div className={'registerAccount_containerImg'}>
                <Link to={{ pathname: '/register-user', state: { isProducer: false }}}>
                    <img
                        className={'registerAccount_containerImg_img'}
                        src={ConsumerImage}
                        alt={'Consommateur'}
                    />
                </Link>
                <div className={'registerAccount_containerImg_divider'} />
                <Link to={{ pathname: '/register-producer', state: { isProducer: true }}}>
                    <img
                        className={'registerAccount_containerImg_img'}
                        src={ProducerImage}
                        alt={'Prodcuteur'}
                    />
                </Link>
            </div>
        </div>
    );
};

export default RegisterAccount;
