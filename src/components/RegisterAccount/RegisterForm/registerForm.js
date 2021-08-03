// == Import : npm
import React, { useEffect, useState, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

// == Import : local
import './style.scss';
import {
    emailRegEx,
    passwordRegEx,
    lowerUpperCharRegEx,
    numberCharRegEx,
    specialCharRegEx,
    minLengthRegEx
} from '../../../utils/regEx';

const RegisterForm = ({
    firstname,
    lastname,
    address,
    city,
    postcode,
    email,
    phone,
    imageFile,
    password,
    establishment,
    job,
    siret,
    description,
    isRegisterFormError,
    registerFormErrorMessage,
    isWaitingRegisterFormValidation,
    registrationIsValidated,
    categories,
    props,
    setInputRegisterFormValues,
    setIsWaitingRegisterFormValidation,
    setRegistrationIsValidated,
    setIsRegisterFormError,
    sendRegisterConsumer,
    getLocation,
    getCategories
}) => {
    const isProducer = props?.location?.state?.isProducer;
    const history = useHistory();
    const [isPasswordFocus, setIsPasswordFocus] = useState(false);
    const [isLowerUpperChar, setIsLowerUpperChar] = useState(false);
    const [isNumberChar, setIsNumberChar] = useState(false);
    const [isSpecialChar, setIsSpecialChar] = useState(false);
    const [isMinLength, setIsMinLength] = useState(false);

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
        isImageFileError: false
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

        return () => {
            setRegistrationIsValidated(false);
            setIsRegisterFormError(false, '')
        }
    }, [])

    useEffect(() => {
        if (typeof isProducer === 'undefined') {
            history.push('/register');
        }
    }, [isProducer, history]);

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
        state.isImageFileError
    ]);

    const handleOnChangeFormInput = (e) => {
        if (e.currentTarget.name === 'imageFile') {
            setInputRegisterFormValues(e.currentTarget.name, Array.from(e.target.files));
        } else {
            setInputRegisterFormValues(e.currentTarget.name, e.currentTarget.value);
        }
    };

    const handleOnClickButtonSubmit = (e) => {
        if (firstname === '') dispatch({ type: 'SETVALUES', name: 'isFirstnameError', value: true });
        if (lastname === '') dispatch({ type: 'SETVALUES', name: 'isLastnameError', value: true });
        if (address === '') dispatch({ type: 'SETVALUES', name: 'isAddressError', value: true });
        if (city === '') dispatch({ type: 'SETVALUES', name: 'isCityError', value: true });
        if (!parseInt(postcode)) dispatch({ type: 'SETVALUES', name: 'isPostcodeError', value: true });
        if (!emailRegEx.test(email)) dispatch({ type: 'SETVALUES', name: 'isEmailError', value: true });
        if (!passwordRegEx.test(password)) dispatch({ type: 'SETVALUES', name: 'isPasswordError', value: true });
        if (isProducer) {
            if (establishment === '') dispatch({ type: 'SETVALUES', name: 'isEstablishmentError', value: true });
            if (job === '') dispatch({ type: 'SETVALUES', name: 'isJobError', value: true });
            if (siret === '') dispatch({ type: 'SETVALUES', name: 'isSiretError', value: true });
            if (imageFile.length === 0) dispatch({ type: 'SETVALUES', name: 'isImageFileError', value: true });
        }
    };

    const handleOnSubmitForm = (e) => {
        e.preventDefault();
        const isError = Object.entries(state).filter(value => {
            return (value[1] === true);
        });
        if (isError.length === 0) {
            setIsWaitingRegisterFormValidation(true);
            isProducer ? getLocation() : sendRegisterConsumer();
        }
    };

    return (
        <div className={'registerForm'}>
            <h2 className={'registerForm_title'}>Je créé mon compte ...</h2>
            <div className={'registerForm_formContainer'}>
                <form className={'registerForm_formContainer_form'} onSubmit={handleOnSubmitForm}>
                    <div className={'registerForm_formContainer_form_inputContainer'}>
                        <label htmlFor={'firstname'}>Prénom</label>
                        <input
                            id={'firstname'}
                            name={'firstname'}
                            type={'text'}
                            placeholder={'Prénom'}
                            value={firstname}
                            onChange={handleOnChangeFormInput}
                        />
                        {state.isFirstnameError &&
                        <div className={'registerForm_formContainer_form_inputContainer_errorMessage'}>
                            Veuillez ajouter un prénom
                        </div>
                        }
                    </div>
                    <div className={'registerForm_formContainer_form_inputContainer'}>
                        <label htmlFor={'lastname'}>Nom</label>
                        <input
                            id={'lastname'}
                            name={'lastname'}
                            type={'text'}
                            placeholder={'Nom'}
                            value={lastname}
                            onChange={handleOnChangeFormInput}
                        />
                        {state.isLastnameError &&
                        <div className={'registerForm_formContainer_form_inputContainer_errorMessage'}>
                            Veuillez ajouter un nom
                        </div>
                        }
                    </div>
                    <div className={'registerForm_formContainer_form_inputContainer'}>
                        <label htmlFor={'address'}>Adresse</label>
                        <input
                            id={'address'}
                            name={'address'}
                            type={'text'}
                            placeholder={'Adresse'}
                            value={address}
                            onChange={handleOnChangeFormInput}
                        />
                        {state.isAddressError &&
                        <div className={'registerForm_formContainer_form_inputContainer_errorMessage'}>
                            Veuillez ajouter une adresse
                        </div>
                        }
                    </div>
                    <div className={'registerForm_formContainer_form_inputContainer'}>
                        <label htmlFor={'city'}>Ville</label>
                        <input
                            id={'city'}
                            name={'city'}
                            type={'text'}
                            placeholder={'Ville'}
                            value={city}
                            onChange={handleOnChangeFormInput}
                        />
                        {state.isCityError &&
                        <div className={'registerForm_formContainer_form_inputContainer_errorMessage'}>
                            Veuillez ajouter une ville
                        </div>
                        }
                    </div>
                    <div className={'registerForm_formContainer_form_inputContainer'}>
                        <label htmlFor={'postcode'}>Code Postal</label>
                        <input
                            id={'postcode'}
                            name={'postcode'}
                            type={'text'}
                            placeholder={'Code Postal'}
                            value={postcode}
                            onChange={handleOnChangeFormInput}
                        />
                        {state.isPostcodeError &&
                        <div className={'registerForm_formContainer_form_inputContainer_errorMessage'}>
                            Veuillez ajouter un code postal
                        </div>
                        }
                    </div>
                    <div className={'registerForm_formContainer_form_inputContainer'}>
                        <label htmlFor={'email'}>Email</label>
                        <input
                            id={'email'}
                            name={'email'}
                            type={'email'}
                            placeholder={'Email'}
                            value={email}
                            onChange={handleOnChangeFormInput}
                        />
                        {state.isEmailError &&
                        <div className={'registerForm_formContainer_form_inputContainer_errorMessage'}>
                            Veuillez ajouter un email
                        </div>
                        }
                    </div>
                    <div className={'registerForm_formContainer_form_inputContainer'}>
                        <label htmlFor={'password'}>Mot de passe</label>
                        <input
                            id={'password'}
                            name={'password'}
                            type={'password'}
                            placeholder={'Mot de passe'}
                            value={password}
                            onChange={handleOnChangeFormInput}
                            onFocus={() => setIsPasswordFocus(true)}
                            onBlur={() => setIsPasswordFocus(false)}
                        />
                        {state.isPasswordError &&
                        <div className={'registerForm_formContainer_form_inputContainer_errorMessage'}>
                            Veuillez ajouter un mot de passe correct
                        </div>
                        }
                        {isPasswordFocus &&
                        <div className={'registerForm_formContainer_form_inputContainer_passwordMessage'}>
                            <p>Le mot de passe doit contenir, au moins :</p>
                            <ul>
                                <li>
                                    {isLowerUpperChar &&
                                    <FontAwesomeIcon className={'registerForm_formContainer_form_inputContainer_passwordMessage_icon'} icon={faCheck} />
                                    }
                                    1 lettre majuscule et 1 minuscule
                                </li>
                                <li>
                                    {isNumberChar &&
                                    <FontAwesomeIcon className={'registerForm_formContainer_form_inputContainer_passwordMessage_icon'} icon={faCheck} />
                                    }
                                    1 chiffre
                                </li>
                                <li>
                                    {isSpecialChar &&
                                    <FontAwesomeIcon className={'registerForm_formContainer_form_inputContainer_passwordMessage_icon'} icon={faCheck} />
                                    }
                                    1 caractère spécial
                                </li>
                                <li>
                                    {isMinLength &&
                                    <FontAwesomeIcon className={'registerForm_formContainer_form_inputContainer_passwordMessage_icon'} icon={faCheck} />
                                    }
                                    6 caratères
                                </li>
                            </ul>
                        </div>
                        }
                    </div>
                    <div className={'registerForm_formContainer_form_inputContainer'}>
                        <label className={'notRequired'} htmlFor={'phone'}>Téléphone</label>
                        <input
                            id={'phone'}
                            name={'phone'}
                            type={'text'}
                            placeholder={'Téléphone'}
                            value={phone}
                            onChange={handleOnChangeFormInput}
                        />
                    </div>
                    {isProducer &&
                    <>
                        <div className={'registerForm_formContainer_form_inputContainer'}>
                            <label htmlFor={'establishment'}>Etablissement</label>
                            <input
                                id={'establishment'}
                                name={'establishment'}
                                type={'text'}
                                placeholder={'Etablissement'}
                                value={establishment}
                                onChange={handleOnChangeFormInput}
                            />
                            {state.isEstablishmentError &&
                            <div className={'registerForm_formContainer_form_inputContainer_errorMessage'}>
                                Veuillez ajouter un nom d'établissement
                            </div>
                            }
                        </div>
                        <div className={'registerForm_formContainer_form_inputContainer'}>
                            <label htmlFor={'job'}>Métier</label>
                            <input
                                id={'job'}
                                name={'job'}
                                type={'text'}
                                placeholder={'Métier'}
                                value={job}
                                onChange={handleOnChangeFormInput}
                            />
                            {state.isJobError &&
                            <div className={'registerForm_formContainer_form_inputContainer_errorMessage'}>
                                Veuillez ajouter un métier
                            </div>
                            }
                        </div>
                        <div className={'registerForm_formContainer_form_inputContainer'}>
                            <label htmlFor={'category'}>Catégorie de produits</label>
                            <select
                                id={'category'}
                                name={'category'}
                                //defaultValue={category}
                                onChange={handleOnChangeFormInput}
                            >
                                {categories.map(category => {
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
                        <div className={'registerForm_formContainer_form_inputContainer'}>
                            <label htmlFor={'siret'}>Numéro Siret</label>
                            <input
                                id={'siret'}
                                name={'siret'}
                                type={'text'}
                                placeholder={'Numéro Siret'}
                                value={siret}
                                onChange={handleOnChangeFormInput}
                            />
                            {state.isSiretError &&
                            <div className={'registerForm_formContainer_form_inputContainer_errorMessage'}>
                                Veuillez ajouter un numéro d'immatriculation de votre entreprise
                            </div>
                            }
                        </div>
                        <div className={'registerForm_formContainer_form_inputContainer'}>
                            <label htmlFor={'imageFile'}>Image</label>
                            <input
                                id={'imageFile'}
                                name={'imageFile'}
                                type={'file'}
                                onChange={handleOnChangeFormInput}
                            />
                            {state.isImageFileError &&
                            <div className={'registerForm_formContainer_form_inputContainer_errorMessage'}>
                                Veuillez ajouter une image
                            </div>
                            }
                        </div>
                        <div className={'registerForm_formContainer_form_inputContainer'}>
                            <label className={'notRequired'} htmlFor={'description'}>Description</label>
                            <textarea
                                id={'description'}
                                name={'description'}
                                placeholder={'Description'}
                                value={description}
                                onChange={handleOnChangeFormInput}
                            />
                        </div>
                    </>
                    }
                    {registrationIsValidated &&
                    <div
                        className={'registerForm_formContainer_form_registrationMessage'}
                        onClick={() => setRegistrationIsValidated(false)}
                    >
                        Votre compte à été créé, vous pouvez maintenant vous connecter.
                    </div>
                    }
                    {isRegisterFormError &&
                    <div
                        className={'registerForm_formContainer_form_errorMessage'}
                        onClick={() => setIsRegisterFormError(false, '')}
                    >
                        {registerFormErrorMessage}.
                    </div>
                    }
                    <div className={'registerForm_formContainer_form_submit'}>
                        <button
                            className={`registerForm_formContainer_form_submit_button ${isWaitingRegisterFormValidation ? 'loading' : ''}`}
                            onClick={handleOnClickButtonSubmit}
                        >
                            {isWaitingRegisterFormValidation
                                ? <div className={'spinnerLoader'} />
                                : 'Valider'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
