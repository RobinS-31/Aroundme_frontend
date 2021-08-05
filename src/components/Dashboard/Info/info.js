// == Import : npm
import React, { useEffect, useReducer, useState } from 'react';

// == Import : local
import './style.scss';
import { emailRegEx } from "../../../utils/regEx";

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

    const initialState = {
        isFirstnameError: false,
        isLastnameError: false,
        isAddressError: false,
        isCityError: false,
        isPostcodeError: false,
        isEstablishmentError: false,
        isJobError: false,
        isSiretError: false,
        isEmailError: false,
    };
    const reducer = (state, action) => {
        switch (action.type) {
            case 'SETVALUES':
                return {
                    ...state,
                    [action.name]: action.value
                };
            case 'RESETVALUES':
                return initialState;
            default: break;
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    useEffect(() => {
        switch (true) {
            case state.isFirstnameError && firstname !== '':
                dispatch({ type: 'SETVALUES', name: 'isFirstnameError', value: false });
                break;
            case state.isLastnameError && lastname !== '':
                dispatch({ type: 'SETVALUES', name: 'isLastnameError', value: false });
                break;
            case state.isAddressError && address !== '':
                dispatch({ type: 'SETVALUES', name: 'isAddressError', value: false });
                break;
            case state.isCityError && city !== '':
                dispatch({ type: 'SETVALUES', name: 'isCityError', value: false });
                break;
            case state.isPostcodeError && postcode !== '':
                if (parseInt(postcode)) dispatch({ type: 'SETVALUES', name: 'isPostcodeError', value: false })
                break;
            case state.isEstablishmentError && establishment !== '':
                dispatch({ type: 'SETVALUES', name: 'isEstablishmentError', value: false });
                break;
            case state.isJobError && job !== '':
                dispatch({ type: 'SETVALUES', name: 'isJobError', value: false });
                break;
            case state.isSiretError && siret !== '':
                dispatch({ type: 'SETVALUES', name: 'isSiretError', value: false });
                break;
            case state.isEmailError && emailRegEx.test(email):
                dispatch({ type: 'SETVALUES', name: 'isEmailError', value: false });
                break;
            default: break;
        }
    }, [
        firstname,
        lastname,
        address,
        city,
        postcode,
        email,
        establishment,
        job,
        siret,
        state.isFirstnameError,
        state.isLastnameError,
        state.isAddressError,
        state.isCityError,
        state.isPostcodeError,
        state.isEstablishmentError,
        state.isJobError,
        state.isSiretError,
        state.isEmailError,
    ])

    const handleOnChangeInputCheckbox = (e) => {
        console.log(e.currentTarget.name, e.currentTarget.value, e.currentTarget.checked);
    };

    const handleOnChangeInput = (e) => {
        console.log(e.currentTarget.name, e.currentTarget.value);
    };

    const handleOnClickSubmitButton = (e) => {
        console.log("handleOnClickSubmitButton");

        if (firstname === '') dispatch({ type: 'SETVALUES', name: 'isFirstnameError', value: true });
        if (lastname === '') dispatch({ type: 'SETVALUES', name: 'isLastnameError', value: true });
        if (address === '') dispatch({ type: 'SETVALUES', name: 'isAddressError', value: true });
        if (city === '') dispatch({ type: 'SETVALUES', name: 'isCityError', value: true });
        if (!parseInt(postcode)) dispatch({ type: 'SETVALUES', name: 'isPostcodeError', value: true });
        if (!emailRegEx.test(email)) dispatch({ type: 'SETVALUES', name: 'isEmailError', value: true });
        if (userData.isProducer) {
            if (establishment === '') dispatch({ type: 'SETVALUES', name: 'isEstablishmentError', value: true });
            if (job === '') dispatch({ type: 'SETVALUES', name: 'isJobError', value: true });
            if (siret === '') dispatch({ type: 'SETVALUES', name: 'isSiretError', value: true });
            if (imageFile.length === 0) dispatch({ type: 'SETVALUES', name: 'isImageFileError', value: true });
        }
    };

    const handleOnSubmitForm = (e) => {
        e.preventDefault();
        console.log("handleOnSubmitForm")

        const isError = Object.entries(state).filter(value => {
            return (value[1] === true);
        });
        if (isError.length === 0) {
            //setIsWaitingRegisterFormValidation(true);
            //userData.isProducer ? getLocation() : sendRegisterConsumer();
        }
    };

    return (
        <div className={'dashboard_info'}>
            <form className={'dashboard_info_form'} onSubmit={handleOnSubmitForm}>
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
                                onChange={handleOnChangeInput}
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
                                onChange={handleOnChangeInput}
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
                                onChange={handleOnChangeInput}
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
                                onChange={handleOnChangeInput}
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
                                onChange={handleOnChangeInput}
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
                                onChange={handleOnChangeInput}
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
                                onChange={handleOnChangeInput}
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
                                        onChange={handleOnChangeInput}
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
                                        onChange={handleOnChangeInput}
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
                                        onChange={handleOnChangeInput}
                                    />
                                </div>
                                <div className={'dashboard_info_form_container_data_item inputContainer'}>
                                    <label htmlFor={'imageFile'}>Image</label>
                                    <input
                                        id={'imageFile'}
                                        name={'imageFile'}
                                        type={'file'}
                                        disabled={disabledInput}
                                        onChange={handleOnChangeInput}
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
                                        onChange={handleOnChangeInput}
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
                        {!disabledInput ? 'Annuler' : 'Modifier'}
                    </button>
                    <button
                        className={'formButton saveButton'}
                        type={'submit'}
                        disabled={disabledInput}
                        onClick={handleOnClickSubmitButton}
                    >
                        Enregister
                    </button>
                </div>
            </form>
        </div>
    );
};
export default Info;
