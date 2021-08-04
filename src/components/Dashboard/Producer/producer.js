// == Import : npm
import React, { useEffect } from 'react';

// == Import : local
import './style.scss';

const Producer = ({
    getCategories,
    categoriesList,
    firstname,
    lastname,
    address,
    city,
    postcode,
    phone,
    establishment,
    job,
    siret,
    description,
    imageFile,
    email,
    props
}) => {
    const { userData } = props;

    useEffect(() => {
        console.log(userData);
        getCategories();
    }, []);

    const handleOnChangeInputCheckbox = (e) => {
        console.log(e.currentTarget.name, e.currentTarget.value, e.currentTarget.checked);
    };

    return (
        <div className={'dashboard_producer'}>
            <form className={'dashboard_producer_info'}>
                <h2 className={'form_title'}>Mes Informations</h2>
                <div className={'dashboard_producer_info_container'}>
                    <div className={'dashboard_producer_info_container_picture'}>
                        <img
                            src={`${process.env.REACT_APP_API_URL}${userData.imageUrl[0]}`}
                            alt={'Représentation du producteur'}
                            loading={'lazy'}
                        />
                    </div>
                    <div className={'dashboard_producer_info_container_data'}>
                        <div className={'dashboard_producer_info_container_data_item inputContainer'}>
                            <label htmlFor={'firstname'}>
                                Prénom
                            </label>
                            <input
                                id={'firstname'}
                                name={'firstname'}
                                type={'text'}
                                placeholder={'Prénom'}
                                value={firstname}
                            />
                        </div>
                        <div className={'dashboard_producer_info_container_data_item inputContainer'}>
                            <label htmlFor={'lastname'}>
                                Nom
                            </label>
                            <input
                                id={'lastname'}
                                name={'lastname'}
                                type={'text'}
                                placeholder={'Nom'}
                                value={lastname}
                            />
                        </div>
                        <div className={'dashboard_producer_info_container_data_item inputContainer'}>
                            <label htmlFor={'address'}>
                                Adresse
                            </label>
                            <input
                                id={'address'}
                                name={'address'}
                                type={'text'}
                                placeholder={'Adresse'}
                                value={address}
                            />
                        </div>
                        <div className={'dashboard_producer_info_container_data_item inputContainer'}>
                            <label htmlFor={'city'}>
                                Ville
                            </label>
                            <input
                                id={'city'}
                                name={'city'}
                                type={'text'}
                                placeholder={'Ville'}
                                value={city}
                            />
                        </div>
                        <div className={'dashboard_producer_info_container_data_item inputContainer'}>
                            <label htmlFor={'postcode'}>Code Postal</label>
                            <input
                                id={'postcode'}
                                name={'postcode'}
                                type={'text'}
                                placeholder={'Code Postal'}
                                value={postcode}
                            />
                        </div>
                        <div className={'dashboard_producer_info_container_data_item inputContainer'}>
                            <label htmlFor={'email'}>Email</label>
                            <input
                                id={'email'}
                                name={'email'}
                                type={'email'}
                                placeholder={'Email'}
                                value={email}
                            />
                        </div>
                        <div className={'dashboard_producer_info_container_data_item inputContainer'}>
                            <label className={'notRequired'} htmlFor={'phone'}>Téléphone</label>
                            <input
                                id={'phone'}
                                name={'phone'}
                                type={'text'}
                                placeholder={'Téléphone'}
                                value={phone}
                            />
                        </div>
                        <div className={'dashboard_producer_info_container_data_item inputContainer'}>
                            <label htmlFor={'establishment'}>Établissement</label>
                            <input
                                id={'establishment'}
                                name={'establishment'}
                                type={'text'}
                                placeholder={'Établissement'}
                                value={establishment}
                            />
                        </div>
                        <div className={'dashboard_producer_info_container_data_item inputContainer'}>
                            <label htmlFor={'job'}>Métier</label>
                            <input
                                id={'job'}
                                name={'job'}
                                type={'text'}
                                placeholder={'Métier'}
                                value={job}
                            />
                        </div>
                        <div className={'dashboard_producer_info_container_data_item inputContainer'}>
                            <label htmlFor={'category'}>Catégorie de produits</label>
                            <div className={'inputContainer_checkboxSection'}>
                                {categoriesList.map(category => {
                                    return (
                                        <div key={category._id}>
                                            <input
                                                type="checkbox"
                                                id={category.name}
                                                name={'categories'}
                                                value={category._id}
                                                onChange={handleOnChangeInputCheckbox}
                                                checked={userData.categories.includes(category._id)}
                                            />
                                            <label htmlFor={category.name}>{category.name}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={'dashboard_producer_info_container_data_item inputContainer'}>
                            <label htmlFor={'siret'}>Numéro Siret</label>
                            <input
                                id={'siret'}
                                name={'siret'}
                                type={'text'}
                                placeholder={'Numéro Siret'}
                                value={siret}
                            />
                        </div>
                        <div className={'dashboard_producer_info_container_data_item inputContainer'}>
                            <label htmlFor={'imageFile'}>Image</label>
                            <input
                                id={'imageFile'}
                                name={'imageFile'}
                                type={'file'}
                            />
                        </div>
                        <div className={'dashboard_producer_info_container_data_item inputContainer'}>
                            <label className={'notRequired'} htmlFor={'description'}>Description</label>
                            <textarea
                                id={'description'}
                                name={'description'}
                                placeholder={'Description'}
                                value={description}
                            />
                        </div>
                    </div>
                </div>
            </form>
            <form className='dashboard_producer_products'>

            </form>
        </div>
    );
};
export default Producer;
