// == Import : npm
import React from 'react';
import { Link } from 'react-router-dom';

// == Import : local
import './style.scss';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer_content'>
                <ul className={'footer_content_list'}>
                    <li>
                        <Link to={'#'}>CGU</Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link to={'#'}>Mentions légales</Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link to={'#'}>À propos</Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link to={'#'}>FAQ</Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link to={'#'}>Nous contacter</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default React.memo(Footer);
