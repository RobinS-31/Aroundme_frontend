// == Import : npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// == Import : components

// == Import : local
import './style.scss';

const SearchBar = ({
    categoriesList,
    addressResult,
    addressValue,
    category,
    distanceUnit,
    distanceMetric,
    userLocation,
    getAddressResult,
    setAddressValue,
    setCategory,
    setDistance,
    setUserLocation,
    displayMap,
    setDisplayMap
}) => {

    const [displayAddressResults, setDisplayAddressResults] = useState(false);
    const [isInAddressResultsZone, setIsInAddressResultsZone] = useState(false);

    const metrics = [
        { key: 'km', text: 'km', value: 'distances' },
        { key: 'min', text: 'min', value: 'durations' },
    ];

    const handleOnChangeInputAndSelect = (e) => {
        const inputName = e.currentTarget.name;
        if (inputName === 'categories') {
            setCategory(e.currentTarget.value);
        }
        if (inputName === 'address') {
            setAddressValue(e.currentTarget.value);
            if (e.currentTarget.value.length >= 3) getAddressResult();
        }
        if (inputName === 'distanceUnit') {
            if (!Number.isNaN(parseInt(e.currentTarget.value))) {
                setDistance('distanceUnit', parseInt(e.currentTarget.value));
            } else {
                setDistance('distanceUnit', 0);
            }
        }
        if (inputName === 'distanceMetric') {
            setDistance('distanceMetric', e.currentTarget.value);
        }
    };

    const handleOnClickResultItem = (result) => {
        setUserLocation(result.location.lon, result.location.lat);
        setAddressValue(result.title);
        setDisplayAddressResults(false);
    };

    const handleOnFocusOnBlurInputAddress = (e) => {
        if (e._reactName === 'onFocus') setDisplayAddressResults(true);
        if (e._reactName === 'onBlur' && !isInAddressResultsZone) setDisplayAddressResults(false);
    };

    return (
        <div className={'searchBar'}>
            <div className={'searchBar_categories'}>
                <label htmlFor={'categories'}>Catégorie de produits</label>
                <select
                    id={'categories'}
                    name={'categories'}
                    defaultValue={category}
                    onChange={handleOnChangeInputAndSelect}
                >
                    <option value={''}>Toutes les categories</option>
                    {categoriesList.map(category => {
                        return (
                            <option
                                key={category._id}
                                value={category._id}
                            >
                                {category.name}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className={'searchBar_location'}>
                <label htmlFor={'address'}>Votre adresse</label>
                <input
                    id={'address'}
                    name={'address'}
                    value={addressValue}
                    placeholder={'Ville ou Adresse'}
                    onChange={handleOnChangeInputAndSelect}
                    onFocus={handleOnFocusOnBlurInputAddress}
                    onBlur={handleOnFocusOnBlurInputAddress}
                />
                <FontAwesomeIcon className={'searchBar_location_icon'} icon={faMapMarkerAlt} />
                <div
                    className={'searchBar_location_displayResults'}
                    onMouseEnter={() => setIsInAddressResultsZone(true)}
                    onMouseLeave={() => setIsInAddressResultsZone(false)}
                >
                    {displayAddressResults && addressResult.length > 0 && addressResult.map(result => {
                        return (
                            <div
                                key={result.key}
                                className={'searchBar_location_displayResults_item'}
                                onClick={() => handleOnClickResultItem(result)}
                            >
                                {result.title}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={'searchBar_distance'}>
                <label htmlFor={'distanceUnit'}>Par distances ou temps de trajet</label>
                <div className={'searchBar_distance_container'}>
                    <input
                        id={'distanceUnit'}
                        name={'distanceUnit'}
                        type={'number'}
                        value={userLocation.lat ? distanceUnit : 0}
                        disabled={!userLocation.lat}
                        onChange={handleOnChangeInputAndSelect}
                    />
                    <select
                        name={'distanceMetric'}
                        onChange={handleOnChangeInputAndSelect}
                        defaultValue={distanceMetric}
                        disabled={!userLocation.lat}
                    >
                        {metrics.map(val => {
                            return (
                                <option key={val.key} value={val.value}>{val.text}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className={'searchBar_displayMapButton'}>
                <button
                    className={displayMap ? 'hideMap' : ''}
                    onClick={() => setDisplayMap(!displayMap)}
                >
                    {displayMap
                        ? 'Masquer la carte'
                        : 'Voir la carte'
                    }
                </button>
            </div>
        </div>
    );
};
export default SearchBar;
