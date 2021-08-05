// == Import : npm
import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

// == Import : components

// == Import : local
import './style.scss';
import blueHome from '../../../../assets/images/blueHome.png';

const MapApi = ({
    userLocation,
    userData,
    props
}) => {

    const { setMarkerIdOnFocus, producerToDisplay } = props;

    const markerHome = new L.Icon({
        iconUrl: blueHome,
        iconSize: [32, 44],
        iconAnchor: [20, 40],
        popupAnchor:  [-5, -30]
    });

    const marker = (producer) => {
        const producerName = `${producer.firstname}${producer.lastname}`;
        const pathName = `/producteur/${producerName.replaceAll(" ", "")}`;

        return (
            <Marker
                key={producer._id}
                position={[producer.lat, producer.lon]}
                eventHandlers={{
                    click: () => setMarkerIdOnFocus(producer._id)
                }}
            >
                <Popup>
                    <Link
                        key={producer._id}
                        to={{
                            pathname: pathName,
                            state: { id: producer._id }
                        }}
                    >
                        <p className="mapapi_container_popup mapapi_container_popup_name">{producer.firstname} {producer.lastname}</p>
                    </Link>
                    <p className="mapapi_container_popup mapapi_container_popup_job">{producer.job}</p>
                </Popup>
            </Marker>
        )
    };

    const handleOnClickMapApi = (e) => {
        if (!e.target.classList.contains("leaflet-marker-icon") && !e.target.classList.contains("mapapi_container_popup") && !e.target.classList.contains("leaflet-popup-content")) {
            setMarkerIdOnFocus("");
        }
    };

    return (
        <div className={'mapapi'} onClick={handleOnClickMapApi}>
            <MapContainer
                className={'mapapi_container'}
                center={userLocation.lat ? [userLocation.lat, userLocation.lon] : [47, 1.7]}
                zoom={userLocation.lat ? 11 : 6}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution={'&copy; <a href=&quot;https://osm.org/copyright&quot;>OpenStreetMap</a> contributors'}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {userLocation.lat &&
                    <Marker
                        key={Math.random() * ((9999 - 1) + 1)}
                        position={[userLocation.lat, userLocation.lon]}
                        icon={markerHome}
                        id={"home"}
                    >
                        <Popup>{userData.address}, {userData.postcode} {userData.city}</Popup>
                    </Marker>
                }
                { producerToDisplay.map(producer => marker(producer)) }
            </MapContainer>
        </div>
    );
};
export default MapApi;
