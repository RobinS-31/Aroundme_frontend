// == Import : npm
import React, { useEffect, useReducer, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

// == Import : local
import './style.scss';
import {
    emailRegEx,
    passwordRegEx,
    lowerUpperCharRegEx,
    numberCharRegEx,
    specialCharRegEx,
    minLengthRegEx
} from '../../utils/regEx';

const Form = ({
    userData,
    categoriesList,
    getCategories,
    setInputFormValues,
    setInitialData,
    setIsWaitingFormValidation,
    setIsWaitingSecurityFormValidation,
    setFormRequestIsValidated,
    setIsFormError,
    sendRegisterConsumer,
    getLocation,
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
    password,
    oldPassword,
    categories,
    isWaitingFormValidation,
    isWaitingSecurityFormValidation,
    formRequestIsValidated,
    isFormError,
    formErrorMessage,
    formRequestValidatedMessage,
    updateUser,
    updateProducer,
    updateSecurityAccount,
    props
}) => {

    const location = useLocation().pathname; // Route empruntée
    const history = useHistory();
    const inputFile = useRef(null);
    const [isProducer, setIsProducer] = useState(false); // Permet au formulaire d'adopter un certain comportement selon la valeur de la variable
    const [isDashboard, setIsDashboard] = useState(false); // Permet au formulaire d'adopter un certain comportement selon la valeur de la variable
    const [disabledInput, setDisabledInput] = useState(false); // Permet au formulaire d'adopter un certain comportement selon la valeur de la variable
    const [isPasswordFocus, setIsPasswordFocus] = useState(false); // Permet d'afficher des indications (ou non) sur les caractères que doit comporter le mot de passe si l'utilisateur est actuellement en train de le saisir
    const [isLowerUpperChar, setIsLowerUpperChar] = useState(false); // Permet d'afficher un icône (ou non) si la contrainte de caractère est respecté, lors de la saisie du mot de passe
    const [isNumberChar, setIsNumberChar] = useState(false); // Permet d'afficher un icône (ou non) si la contrainte de caractère est respecté, lors de la saisie du mot de passe
    const [isSpecialChar, setIsSpecialChar] = useState(false); // Permet d'afficher un icône (ou non) si la contrainte de caractère est respecté, lors de la saisie du mot de passe
    const [isMinLength, setIsMinLength] = useState(false); // Permet d'afficher un icône (ou non) si la contrainte de caractère est respecté, lors de la saisie du mot de passe

    /**
     * "State" destiné au "reducerForm" indiquant si il y a des erreurs sur les valeurs liées aux "inputs"
     * @type {{isPostcodeError: boolean, isJobError: boolean, isEmailError: boolean, isImageFileError: boolean, isFirstnameError: boolean, isEstablishmentError: boolean, isLastnameError: boolean, isPasswordError: boolean, isCityError: boolean, isAddressError: boolean, isSiretError: boolean}}
     */
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
        isPasswordError: false,
        isOldPasswordError: false,
        isImageFileError: false,
        isCategoriesError: false
    };

    /**
     * "Reducer" permettant de gérer les erreurs liées aux "inputs"
     * @param state
     * @param action
     * @returns {{isPostcodeError: boolean, isJobError: boolean, isEmailError: boolean, isImageFileError: boolean, isFirstnameError: boolean, isEstablishmentError: boolean, isLastnameError: boolean, isPasswordError: boolean, isCityError: boolean, isAddressError: boolean, isSiretError: boolean}|*}
     */
    const reducerForm = (state, action) => {
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
    const [state, dispatch] = useReducer(reducerForm, initialState);

    useEffect(() => {
        return () => {
            setFormRequestIsValidated(false, '');
            setIsFormError(false, '');
        }
    }, []);

    /**
     * Récupère la liste des catégories de produits au chargement du composant.
     */
    useEffect(() => {
        getCategories();
    }, [getCategories]);

    /**
     * Si le composant est appelé dans le composant "Dashboard", alors les valeurs des propriétés de l'objet "initialState"
     * lié au "reducer" "form" sont mises à jour pour correspondre aux informations du producteur.
     */
    useEffect(() => {
        if (isDashboard) {
            const userInfo = { ...userData };
            delete userInfo._id;
            delete userInfo.isProducer;
            delete userInfo.imageUrl;
            delete userInfo.products;
            setInitialData(userInfo);
        }
    }, [isDashboard, userData]);

    /**
     * Selon la route où sera affiché le composant, les variables "isProducer" et "isDashboard" sont
     * mises à jour afin de permettre au composant d'adopter un certains comportement.
     */
    useEffect(() => {
        switch (location) {
            case '/register-user':
                setIsProducer(false);
                setIsDashboard(false);
                break;
            case '/register-producer':
                setIsProducer(true);
                setIsDashboard(false);
                break;
            case '/dashboard':
                setIsProducer(userData.isProducer);
                setIsDashboard(true);
                setDisabledInput(true);
                break;
            default:
                history.push('/');
                break;
        }
    }, [location, userData]);

    /**
     * Si il y a des erreurs sur les valeurs liées aux "inputs" concernés, permet de vérifier si y a toujours des erreurs et d'indiquer si ce n'est plus le cas,
     * lors de changement sur ces valeurs.
     */
    useEffect(() => {
        lowerUpperCharRegEx.test(password) ? setIsLowerUpperChar(true) : setIsLowerUpperChar(false);
        numberCharRegEx.test(password) ? setIsNumberChar(true) : setIsNumberChar(false);
        specialCharRegEx.test(password) ? setIsSpecialChar(true) : setIsSpecialChar(false);
        minLengthRegEx.test(password) ? setIsMinLength(true) : setIsMinLength(false);

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
            case state.isPasswordError && passwordRegEx.test(password):
                dispatch({ type: 'SETVALUES', name: 'isPasswordError', value: false });
                break;
            case state.isImageFileError && imageFile.length !== 0:
                dispatch({ type: 'SETVALUES', name: 'isImageFileError', value: false });
                break;
            case state.isCategoriesError && categories.length !== 0:
                dispatch({ type: 'SETVALUES', name: 'isCategoriesError', value: false });
                break;
            case state.isOldPasswordError && oldPassword !== '':
                dispatch({ type: 'SETVALUES', name: 'isOldPasswordError', value: false });
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
        imageFile,
        password,
        establishment,
        job,
        siret,
        categories,
        oldPassword,
        state.isFirstnameError,
        state.isLastnameError,
        state.isAddressError,
        state.isCityError,
        state.isPostcodeError,
        state.isEstablishmentError,
        state.isJobError,
        state.isSiretError,
        state.isEmailError,
        state.isPasswordError,
        state.isImageFileError,
        state.isCategoriesError,
        state.isOldPasswordError
    ]);

    /**
     * Fonction permettant de mettre à jour les propriétés de l'objet "initialState" lié au "reducer" "form"
     * lors d'un changement sur les "inputs" concernés.
     * @param e
     */
    const handleOnChangeFormInput = (e) => {
        if (e.currentTarget.name === 'imageFile') {
            setInputFormValues(e.currentTarget.name, Array.from(e.target.files));

        } else if (e.currentTarget.name === 'categories') {
            const categoriesTemp = [...categories];

            if (e.currentTarget.checked) {
                categoriesTemp.push(e.currentTarget.value);
                setInputFormValues(e.currentTarget.name, categoriesTemp);
            } else {
                const elToRemoveIndex = categoriesTemp.findIndex(element => element === e.currentTarget.value);
                categoriesTemp.splice(elToRemoveIndex, 1);
                setInputFormValues(e.currentTarget.name, categoriesTemp);
            }

        } else {
            setInputFormValues(e.currentTarget.name, e.currentTarget.value);
        }
    };

    /**
     * Fonction gérant le clique sur le bouton "Valider", du formulaire de création de compte (quand le composant est appelé sur la route '/register')
     * ou du formulaire de gestion de compte (quand le composant est appelé sur la route '/dashboard').
     * Vérifie que les valeurs des "inputs" correspondent à ce qui est attendu, sinon indique qu'il y a une ou des erreurs.
     * @param e
     */
    const handleOnClickSubmitButton = (e) => {
        if (firstname === '') dispatch({ type: 'SETVALUES', name: 'isFirstnameError', value: true });
        if (lastname === '') dispatch({ type: 'SETVALUES', name: 'isLastnameError', value: true });
        if (address === '') dispatch({ type: 'SETVALUES', name: 'isAddressError', value: true });
        if (city === '') dispatch({ type: 'SETVALUES', name: 'isCityError', value: true });
        if (!parseInt(postcode)) dispatch({ type: 'SETVALUES', name: 'isPostcodeError', value: true });
        if (!emailRegEx.test(email)) dispatch({ type: 'SETVALUES', name: 'isEmailError', value: true });
        if (!isDashboard && !passwordRegEx.test(password)) dispatch({ type: 'SETVALUES', name: 'isPasswordError', value: true });
        if (isProducer) {
            if (establishment === '') dispatch({ type: 'SETVALUES', name: 'isEstablishmentError', value: true });
            if (job === '') dispatch({ type: 'SETVALUES', name: 'isJobError', value: true });
            if (siret === '') dispatch({ type: 'SETVALUES', name: 'isSiretError', value: true });
            if (!isDashboard && imageFile.length === 0) dispatch({ type: 'SETVALUES', name: 'isImageFileError', value: true });
            if (!categories.length) dispatch({ type: 'SETVALUES', name: 'isCategoriesError', value: true });
        }
    };

    /**
     * Fonction gérant la soumission du formulaire de création de compte (quand le composant est appelé sur la route '/register')
     * ou du formulaire de gestion de compte (quand le composant est appelé sur la route '/dashboard').
     * @param e
     */
    const handleOnSubmitForm = (e) => {
        e.preventDefault();
        const isError = Object.entries(state).filter(value => {
            return (value[1] === true);
        });
        if (isError.length === 0) {
            setIsWaitingFormValidation(true);
            if (isDashboard) {
                isProducer ? updateProducer() : updateUser();
            } else {
                isProducer ? getLocation() : sendRegisterConsumer();
            }
        }
    };

    /**
     * Fonction gérant le clique sur le bouton "Valider" du formulaire de sécurité (pour changer son mot de passe, uniquement
     * présent quand le formulaire est appelé sur la route 'dashboard').
     * @param e
     */
    const handleOnClickSecuritySubmitButton = (e) => {
        if (!passwordRegEx.test(password)) dispatch({ type: 'SETVALUES', name: 'isPasswordError', value: true });
        if (oldPassword === '') dispatch({ type: 'SETVALUES', name: 'isOldPasswordError', value: true });
    };

    const handleOnSubmitSecurityForm = (e) => {
        e.preventDefault();
        const isError = Object.entries(state).filter(value => {
            return (value[1] === true);
        });
        if (isError.length === 0) {
            setIsWaitingSecurityFormValidation(true);
            updateSecurityAccount();
        }
    };

    return (
        <>
            <form className={'form'} onSubmit={handleOnSubmitForm}>
                <div className={'form_container'}>
                    {isProducer && isDashboard &&
                        <div className={'form_container_picture'}>
                            {imageFile.length === 0
                                ?
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}${userData.imageUrl[0]}`}
                                        alt={'Représentation du producteur'}
                                        loading={'lazy'}
                                    />
                                :
                                    <img
                                        src={URL.createObjectURL(imageFile[0])}
                                        alt={'Représentation du producteur'}
                                        loading={'lazy'}
                                    />
                            }
                        </div>
                    }
                    <div className={'form_container_data'}>
                        <div className={'form_container_data_item inputContainer'}>
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
                                onChange={handleOnChangeFormInput}
                            />
                            {state.isFirstnameError &&
                            <div className={'inputContainer_errorMessage'}>
                                Veuillez ajouter un prénom
                            </div>
                            }
                        </div>
                        <div className={'form_container_data_item inputContainer'}>
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
                                onChange={handleOnChangeFormInput}
                            />
                            {state.isLastnameError &&
                            <div className={'inputContainer_errorMessage'}>
                                Veuillez ajouter un nom
                            </div>
                            }
                        </div>
                        <div className={'form_container_data_item inputContainer'}>
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
                                onChange={handleOnChangeFormInput}
                            />
                            {state.isAddressError &&
                            <div className={'inputContainer_errorMessage'}>
                                Veuillez ajouter une adresse
                            </div>
                            }
                        </div>
                        <div className={'form_container_data_item inputContainer'}>
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
                                onChange={handleOnChangeFormInput}
                            />
                            {state.isCityError &&
                            <div className={'inputContainer_errorMessage'}>
                                Veuillez ajouter une ville
                            </div>
                            }
                        </div>
                        <div className={'form_container_data_item inputContainer'}>
                            <label htmlFor={'postcode'}>Code Postal</label>
                            <input
                                id={'postcode'}
                                name={'postcode'}
                                type={'text'}
                                placeholder={'Code Postal'}
                                value={postcode}
                                disabled={disabledInput}
                                onChange={handleOnChangeFormInput}
                            />
                            {state.isPostcodeError &&
                            <div className={'inputContainer_errorMessage'}>
                                Veuillez ajouter un code postal
                            </div>
                            }
                        </div>
                        <div className={'form_container_data_item inputContainer'}>
                            <label htmlFor={'email'}>Email</label>
                            <input
                                id={'email'}
                                name={'email'}
                                type={'email'}
                                placeholder={'Email'}
                                value={email}
                                disabled={disabledInput}
                                onChange={handleOnChangeFormInput}
                            />
                            {state.isEmailError &&
                            <div className={'inputContainer_errorMessage'}>
                                Veuillez ajouter un email
                            </div>
                            }
                        </div>
                        {!isDashboard &&
                        <div className={'form_container_data_item inputContainer'}>
                            <label htmlFor={'password'}>Mot de passe</label>
                            <input
                                id={'password'}
                                name={'password'}
                                type={'password'}
                                placeholder={'Mot de passe'}
                                value={password}
                                disabled={disabledInput}
                                onChange={handleOnChangeFormInput}
                                onFocus={() => setIsPasswordFocus(true)}
                                onBlur={() => setIsPasswordFocus(false)}
                            />
                            {state.isPasswordError &&
                            <div className={'inputContainer_errorMessage'}>
                                Veuillez ajouter un mot de passe correct
                            </div>
                            }
                            {isPasswordFocus &&
                            <div className={'inputContainer_passwordMessage'}>
                                <p>Le mot de passe doit contenir, au moins :</p>
                                <ul>
                                    <li>
                                        {isLowerUpperChar &&
                                        <FontAwesomeIcon className={'inputContainer_passwordMessage_icon'} icon={faCheck} />
                                        }
                                        1 lettre majuscule et 1 minuscule
                                    </li>
                                    <li>
                                        {isNumberChar &&
                                        <FontAwesomeIcon className={'inputContainer_passwordMessage_icon'} icon={faCheck} />
                                        }
                                        1 chiffre
                                    </li>
                                    <li>
                                        {isSpecialChar &&
                                        <FontAwesomeIcon className={'inputContainer_passwordMessage_icon'} icon={faCheck} />
                                        }
                                        1 caractère spécial
                                    </li>
                                    <li>
                                        {isMinLength &&
                                        <FontAwesomeIcon className={'inputContainer_passwordMessage_icon'} icon={faCheck} />
                                        }
                                        6 caratères
                                    </li>
                                </ul>
                            </div>
                            }
                        </div>
                        }
                        <div className={'form_container_data_item inputContainer'}>
                            <label className={'notRequired'} htmlFor={'phone'}>Téléphone</label>
                            <input
                                id={'phone'}
                                name={'phone'}
                                type={'text'}
                                placeholder={'Téléphone'}
                                value={phone}
                                disabled={disabledInput}
                                onChange={handleOnChangeFormInput}
                            />
                        </div>
                        {isProducer &&
                        <>
                            <div className={'form_container_data_item inputContainer'}>
                                <label htmlFor={'establishment'}>Établissement</label>
                                <input
                                    id={'establishment'}
                                    name={'establishment'}
                                    type={'text'}
                                    placeholder={'Établissement'}
                                    value={establishment}
                                    disabled={disabledInput}
                                    onChange={handleOnChangeFormInput}
                                />
                                {state.isEstablishmentError &&
                                <div className={'inputContainer_errorMessage'}>
                                    Veuillez ajouter un nom d'établissement
                                </div>
                                }
                            </div>
                            <div className={'form_container_data_item inputContainer'}>
                                <label htmlFor={'job'}>Métier</label>
                                <input
                                    id={'job'}
                                    name={'job'}
                                    type={'text'}
                                    placeholder={'Métier'}
                                    value={job}
                                    disabled={disabledInput}
                                    onChange={handleOnChangeFormInput}
                                />
                                {state.isJobError &&
                                <div className={'inputContainer_errorMessage'}>
                                    Veuillez ajouter un métier
                                </div>
                                }
                            </div>
                            <div className={'form_container_data_item inputContainer'}>
                                <label htmlFor={'siret'}>Numéro Siret</label>
                                <input
                                    id={'siret'}
                                    name={'siret'}
                                    type={'text'}
                                    placeholder={'Numéro Siret'}
                                    value={siret}
                                    disabled={disabledInput}
                                    onChange={handleOnChangeFormInput}
                                />
                                {state.isSiretError &&
                                <div className={'inputContainer_errorMessage'}>
                                    Veuillez ajouter le numéro d'immatriculation de votre entreprise
                                </div>
                                }
                            </div>
                            <div className={'form_container_data_item inputContainer'}>
                                <label htmlFor={'imageFile'}>Image</label>
                                <input
                                    id={'imageFile'}
                                    name={'imageFile'}
                                    type={'file'}
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                    ref={inputFile}
                                    disabled={disabledInput}
                                    onChange={handleOnChangeFormInput}
                                />
                                {state.isImageFileError &&
                                <div className={'inputContainer_errorMessage'}>
                                    Veuillez ajouter une image
                                </div>
                                }
                            </div>
                            <div className={'form_container_data_item inputContainer'}>
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
                                                    onChange={handleOnChangeFormInput}
                                                    checked={isDashboard ? !!(isDashboard && categories.includes(category._id)) : null}
                                                    disabled={disabledInput}
                                                />
                                                <label htmlFor={category.name}>{category.name}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                                {state.isCategoriesError &&
                                <div className={'inputContainer_errorMessage'}>
                                    Veuillez ajouter une ou plusieurs catégories
                                </div>
                                }
                            </div>
                            <div className={'form_container_data_item inputContainer'}>
                                <label className={'notRequired'} htmlFor={'description'}>Description</label>
                                <textarea
                                    id={'description'}
                                    name={'description'}
                                    placeholder={'Description'}
                                    value={description}
                                    disabled={disabledInput}
                                    rows={6}
                                    onChange={handleOnChangeFormInput}
                                />
                            </div>
                        </>
                        }
                    </div>
                </div>
                {formRequestIsValidated &&
                    <div
                        className={'registerForm_formContainer_form_registrationMessage'}
                        onClick={() => setFormRequestIsValidated(false, '')}
                    >
                        {formRequestValidatedMessage}
                    </div>
                }
                {isFormError &&
                    <div
                        className={'registerForm_formContainer_form_errorMessage'}
                        onClick={() => setIsFormError(false, '')}
                    >
                        {formErrorMessage}.
                    </div>
                }
                <div className={'form_button'}>
                    {isDashboard &&
                        <button
                            className={'formButton editButton'}
                            type={'button'}
                            onClick={() => setDisabledInput(!disabledInput)}
                        >
                            {!disabledInput ? 'Annuler' : 'Modifier'}
                        </button>
                    }
                    <button
                        className={`formButton saveButton ${isWaitingFormValidation ? 'loading' : ''}`}
                        type={'submit'}
                        disabled={disabledInput}
                        onClick={handleOnClickSubmitButton}
                    >
                        {isWaitingFormValidation
                            ? <div className={'spinnerLoader'} />
                            : 'Valider'
                        }
                    </button>
                </div>
            </form>
            {isDashboard &&
                <form className={'form security'} onSubmit={handleOnSubmitSecurityForm}>
                    <h2 className={'title'}>Modifier mon mot de passe</h2>
                    <div className={'form_container'}>
                        <div className={'form_container_data_item inputContainer'}>
                            <label htmlFor={'oldPassword'}>Ancien mot de passe</label>
                            <input
                                id={'oldPassword'}
                                name={'oldPassword'}
                                type={'password'}
                                placeholder={'Ancien mot de passe'}
                                value={oldPassword}
                                onChange={handleOnChangeFormInput}
                            />
                            {state.isOldPasswordError &&
                            <div className={'inputContainer_errorMessage'}>
                                Veuillez indiquer votre ancien mot de passe
                            </div>
                            }
                        </div>
                        <div className={'form_container_data_item inputContainer'}>
                            <label htmlFor={'password'}>Nouveau mot de passe</label>
                            <input
                                id={'password'}
                                name={'password'}
                                type={'password'}
                                placeholder={'Nouveau mot de passe'}
                                value={password}
                                onChange={handleOnChangeFormInput}
                                onFocus={() => setIsPasswordFocus(true)}
                                onBlur={() => setIsPasswordFocus(false)}
                            />
                            {state.isPasswordError &&
                            <div className={'inputContainer_errorMessage'}>
                                Veuillez ajouter un mot de passe correct
                            </div>
                            }
                            {isPasswordFocus &&
                            <div className={'inputContainer_passwordMessage'}>
                                <p>Le mot de passe doit contenir, au moins :</p>
                                <ul>
                                    <li>
                                        {isLowerUpperChar &&
                                        <FontAwesomeIcon className={'inputContainer_passwordMessage_icon'} icon={faCheck} />
                                        }
                                        1 lettre majuscule et 1 minuscule
                                    </li>
                                    <li>
                                        {isNumberChar &&
                                        <FontAwesomeIcon className={'inputContainer_passwordMessage_icon'} icon={faCheck} />
                                        }
                                        1 chiffre
                                    </li>
                                    <li>
                                        {isSpecialChar &&
                                        <FontAwesomeIcon className={'inputContainer_passwordMessage_icon'} icon={faCheck} />
                                        }
                                        1 caractère spécial
                                    </li>
                                    <li>
                                        {isMinLength &&
                                        <FontAwesomeIcon className={'inputContainer_passwordMessage_icon'} icon={faCheck} />
                                        }
                                        6 caratères
                                    </li>
                                </ul>
                            </div>
                            }
                        </div>
                    </div>
                    <div className={'form_button'}>
                        <button
                            className={`formButton saveButton ${isWaitingSecurityFormValidation ? 'loading' : ''}`}
                            type={'submit'}
                            onClick={handleOnClickSecuritySubmitButton}
                        >
                            {isWaitingSecurityFormValidation
                                ? <div className={'spinnerLoader'} />
                                : 'Valider'
                            }
                        </button>
                    </div>
                </form>
            }
        </>
    );
};
export default Form;
