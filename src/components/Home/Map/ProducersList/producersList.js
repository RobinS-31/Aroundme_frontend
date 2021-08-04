// == Import : npm
import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// == Import : components

// == Import : local
import './style.scss';

const ProducersList = ({ props }) => {

    const { markerIdOnFocus, producerToDisplay } = props
    const producerList = useRef(null);
    const producerItem = useRef(null);

    useEffect(() => {
        const heightToSkip = producerList.current.childNodes[0].offsetTop;
        if (producerItem.current) {
            producerList.current.scrollTo({
                top: (producerItem.current.offsetTop - (heightToSkip + 12)),
                left: 0,
                behavior: "smooth"
            });
        }
    }, [producerItem, markerIdOnFocus, producerList]);

    const producerDisplay = (producer) => {
        const producerName = `${producer.firstname}${producer.lastname}`;
        const pathName = `/producteur/${producerName.replaceAll(" ", "")}`;

        return (
            <Link
                key={producer._id}
                to={{
                    pathname: pathName,
                    state: { id: producer._id }
                }}
            >
                <div
                    className={'producersList_item'}
                    ref={producer._id === markerIdOnFocus ? producerItem : null}
                    style={markerIdOnFocus === producer._id ? { backgroundColor: "#fec679" } : {}}
                >
                    <div className={'producersList_item_imgContainer'}>
                        <img
                            src={`${process.env.REACT_APP_API_URL}${producer.imageUrl[1]}`}
                            alt={'Produceteur'}
                            loading={'lazy'}
                        />
                    </div>
                    <div className={'producersList_item_content'}>
                        <div className={'producersList_item_content_name'}>
                            {producer.firstname} {producer.lastname}
                        </div>
                        <div className={'producersList_item_content_job'}>
                            <p>
                                <span className={'producersList_item_content_job_spanKey'}>Etablissement :</span>
                                <span className={'producersList_item_content_job_spanValue'}> {producer.establishment}</span>
                            </p>
                            <p>
                                <span className={'producersList_item_content_job_spanKey'}>Métier :</span>
                                <span className={'producersList_item_content_job_spanValue'}> {producer.job}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    };

    return (
        <div className={'producersList'} ref={producerList}>
            {producerToDisplay.length
                ? producerToDisplay.map(producer => producerDisplay(producer))
                : <div />
            }
        </div>
    );
};
export default ProducersList;
