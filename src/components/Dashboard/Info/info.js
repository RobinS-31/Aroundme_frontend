// == Import : npm
import React, { useEffect, useState } from 'react';

// == Import : local
import './style.scss';

const Info = ({
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
    const [disabledInput, setDisabledInput] = useState(true);

    useEffect(() => {
        console.log(userData);
        getCategories();
    }, []);

    const handleOnChangeInputCheckbox = (e) => {
        console.log(e.currentTarget.name, e.currentTarget.value, e.currentTarget.checked);
    };

    return (
        <div className={'dashboard_info'}>
            <form className={'dashboard_info_form'}>
                <h2 className={'form_title'}>Mes Informations</h2>
                <div className={'dashboard_info_form_container'}>
                    <div className={'dashboard_info_form_container_picture'}>
                        <img
                            src={`${process.env.REACT_APP_API_URL}${userData.imageUrl[0]}`}
                            alt={'Représentation du producteur'}
                            loading={'lazy'}
                        />
                    </div>
                    <div className={'dashboard_info_form_container_data'}>
                        <div className={'dashboard_info_form_container_data_item inputContainer'}>
                            <label htmlFor={'firstname'}>
                                Prénom
                            </label>
                            <input
                                id={'firstname'}
                                name={'firstname'}
                                type={'text'}
                                placeholder={'Prénom'}
                                value={firstname}
                                disabled={disabledInput}
                            />
                        </div>
                        <div className={'dashboard_info_form_container_data_item inputContainer'}>
                            <label htmlFor={'lastname'}>
                                Nom
                            </label>
                            <input
                                id={'lastname'}
                                name={'lastname'}
                                type={'text'}
                                placeholder={'Nom'}
                                value={lastname}
                                disabled={disabledInput}
                            />
                        </div>
                        <div className={'dashboard_info_form_container_data_item inputContainer'}>
                            <label htmlFor={'address'}>
                                Adresse
                            </label>
                            <input
                                id={'address'}
                                name={'address'}
                                type={'text'}
                                placeholder={'Adresse'}
                                value={address}
                                disabled={disabledInput}
                            />
                        </div>
                        <div className={'dashboard_info_form_container_data_item inputContainer'}>
                            <label htmlFor={'city'}>
                                Ville
                            </label>
                            <input
                                id={'city'}
                                name={'city'}
                                type={'text'}
                                placeholder={'Ville'}
                                value={city}
                                disabled={disabledInput}
                            />
                        </div>
                        <div className={'dashboard_info_form_container_data_item inputContainer'}>
                            <label htmlFor={'postcode'}>Code Postal</label>
                            <input
                                id={'postcode'}
                                name={'postcode'}
                                type={'text'}
                                placeholder={'Code Postal'}
                                value={postcode}
                                disabled={disabledInput}
                            />
                        </div>
                        <div className={'dashboard_info_form_container_data_item inputContainer'}>
                            <label htmlFor={'email'}>Email</label>
                            <input
                                id={'email'}
                                name={'email'}
                                type={'email'}
                                placeholder={'Email'}
                                value={email}
                                disabled={disabledInput}
                            />
                        </div>
                        <div className={'dashboard_info_form_container_data_item inputContainer'}>
                            <label className={'notRequired'} htmlFor={'phone'}>Téléphone</label>
                            <input
                                id={'phone'}
                                name={'phone'}
                                type={'text'}
                                placeholder={'Téléphone'}
                                value={phone}
                                disabled={disabledInput}
                            />
                        </div>
                        {userData.isProducer &&
                            <>
                                <div className={'dashboard_info_form_container_data_item inputContainer'}>
                                    <label htmlFor={'establishment'}>Établissement</label>
                                    <input
                                        id={'establishment'}
                                        name={'establishment'}
                                        type={'text'}
                                        placeholder={'Établissement'}
                                        value={establishment}
                                        disabled={disabledInput}
                                    />
                                </div>
                                <div className={'dashboard_info_form_container_data_item inputContainer'}>
                                    <label htmlFor={'job'}>Métier</label>
                                    <input
                                        id={'job'}
                                        name={'job'}
                                        type={'text'}
                                        placeholder={'Métier'}
                                        value={job}
                                        disabled={disabledInput}
                                    />
                                </div>
                                <div className={'dashboard_info_form_container_data_item inputContainer'}>
                                    <label htmlFor={'category'}>Catégorie de produits</label>
                                    <div className={`inputContainer_checkboxSection ${disabledInput ? 'disabled' : ''}`}>
                                        {categoriesList.map(category => {
                                            return (
                                                <div key={category._id} className={"inputContainer_checkboxSection_item"}>
                                                    <input
                                                        type="checkbox"
                                                        id={category.name}
                                                        name={'categories'}
                                                        value={category._id}
                                                        onChange={handleOnChangeInputCheckbox}
                                                        checked={userData.categories.includes(category._id) ? true : null}
                                                        disabled={disabledInput}
                                                    />
                                                    <label htmlFor={category.name}>{category.name}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className={'dashboard_info_form_container_data_item inputContainer'}>
                                    <label htmlFor={'siret'}>Numéro Siret</label>
                                    <input
                                        id={'siret'}
                                        name={'siret'}
                                        type={'text'}
                                        placeholder={'Numéro Siret'}
                                        value={siret}
                                        disabled={disabledInput}
                                    />
                                </div>
                                <div className={'dashboard_info_form_container_data_item inputContainer'}>
                                    <label htmlFor={'imageFile'}>Image</label>
                                    <input
                                        id={'imageFile'}
                                        name={'imageFile'}
                                        type={'file'}
                                        disabled={disabledInput}
                                    />
                                </div>
                                <div className={'dashboard_info_form_container_data_item inputContainer'}>
                                    <label className={'notRequired'} htmlFor={'description'}>Description</label>
                                    <textarea
                                        id={'description'}
                                        name={'description'}
                                        placeholder={'Description'}
                                        value={description}
                                        disabled={disabledInput}
                                        rows={6}
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className={'dashboard_info_form_button'}>
                    <button
                        className={'formButton editButton'}
                        type={'button'}
                        onClick={() => setDisabledInput(!disabledInput)}
                    >
                        Modifier
                    </button>
                    <button className={'formButton saveButton'} type={'button'}>Enregister</button>
                </div>
            </form>
        </div>
    );
};
export default Info;
