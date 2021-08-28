// == Import : npm
import React, { useRef, useState } from 'react';

// == Import : components
import Form from "../../containers/form";
import Products from "../../containers/products";

// == Import : local
import './style.scss';

const Dashboard = ({ isProducer }) => {

    const dashboardMenu = useRef(null);
    const [menuToDisplay, setMenuToDisplay] = useState('informations');

    const handleOnClickMenuButton = () => {
        const menuButtons = dashboardMenu.current.childNodes;
        menuButtons.forEach(button => {
            button.classList.toggle('active');
        });
    };

    return (
        <div className={'section dashboard'}>
            {isProducer &&
                <div className={'dashboard_menu'} ref={dashboardMenu}>
                    <button
                        className={'dashboard_menu_button active'}
                        onClick={() => {
                            handleOnClickMenuButton();
                            setMenuToDisplay('informations');
                        }}
                    >
                        Informations
                    </button>
                    <button
                        className={'dashboard_menu_button'}
                        onClick={() => {
                            handleOnClickMenuButton();
                            setMenuToDisplay('products');
                        }}
                    >
                        Produits
                    </button>
                </div>
            }
            {menuToDisplay === 'informations' &&
                <div className={'dashboard_content'}>
                    <h2 className={'title'}>Mes Informations</h2>
                    <Form />
                </div>
            }
            {menuToDisplay === 'products' && isProducer &&
                <div className={'dashboard_content'}>
                    <h2 className={'title dashboard_content_title'}>Mes Produits</h2>
                    <Products />
                </div>
            }
        </div>
    );
};
export default Dashboard;
