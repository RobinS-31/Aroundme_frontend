// == Import : npm
import React, { useEffect, useState } from 'react';

// == Import : components
import MapApi from "../../../containers/mapApi";
import ProducersList from "../../../containers/producersList";

// == Import : local
import './style.scss';

const Map = ({
    producersList,
    category,
    distanceUnit,
    distanceMetric,
    distanceOrDuration,
    props
}) => {

    const [markerIdOnFocus, setMarkerIdOnFocus] = useState('');
    const [producerToDisplay, setProducerToDisplay] = useState([]);

    const displayMarker = () => {
        const producerFiltering = [];

        producersList.map(async (producer, index) => {
            if (category || distanceUnit) {
                if (category && distanceUnit) {
                    producer.categories.map(cat => {
                        if (cat === category && distanceMetric === 'distances' && distanceOrDuration[index] <= (distanceUnit * 1000)) {
                            producerFiltering.push(producer);
                        }
                        if (cat === category && distanceMetric === 'durations' && (distanceOrDuration[index] / 60) <= distanceUnit) {
                            producerFiltering.push(producer);
                        }
                    });
                } else if (category) {
                    await Promise.all(
                        producer.categories.map(cat => {
                            if (cat === category) {
                                producerFiltering.push(producer);
                            }
                        })
                    )
                } else if (distanceUnit) {
                    if (distanceMetric === 'distances' && distanceOrDuration[index] <= (distanceUnit * 1000)) producerFiltering.push(producer);
                    if (distanceMetric === 'durations' && (distanceOrDuration[index] / 60) <= distanceUnit) producerFiltering.push(producer);
                }
            }
        });

        if (category || distanceUnit) {
            setProducerToDisplay(producerFiltering);
        } else {
            setProducerToDisplay(producersList);
        }
    };

    useEffect(() => {
        displayMarker();
    }, [
        producersList,
        category,
        distanceUnit,
        distanceMetric,
        distanceOrDuration
    ]);

    return (
        <div className={'map'}>
            <ProducersList markerIdOnFocus={markerIdOnFocus} producerToDisplay={producerToDisplay}/>
            <MapApi setMarkerIdOnFocus={setMarkerIdOnFocus} producerToDisplay={producerToDisplay} />
        </div>
    );
};
export default Map;
