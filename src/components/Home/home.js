// == Import : npm
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// == Import : components
import Map from "../../containers/map";
import SearchBar from "../../containers/searchBar";

// == Import : local
import './style.scss';

const Home = ({ getProducersList, getCategories }) => {

    const [displayMap, setDisplayMap] = useState(false);

    useEffect(() => {
        getProducersList();
        getCategories();
    }, [getProducersList, getCategories]);

    return (
        <div className={'home'}>
            <div className={'home_intro'}>
                <h1>Découvrez les producteurs autour de chez vous !</h1>
                <p>
                    Pour tout ceux qui veulent consommer mieux, favoriser les circuits courts et privilégier les producteurs locaux.
                    <br/>
                    Trouvez les meilleurs produits de votré région, frais et produit localement.
                    <br/>
                    <br/>
                    Entrez votre adresse pour trouver rapidement les producteurs autour de vous, ou afficher la carte pour voir tout les producteurs en France.
                </p>
            </div>
            <SearchBar displayMap={displayMap} setDisplayMap={setDisplayMap} />
            {displayMap &&
            <Map />
            }
        </div>
    );
};
export default Home;
