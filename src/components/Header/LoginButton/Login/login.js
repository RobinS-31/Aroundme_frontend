// == Import : npm
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLock, faCheckCircle, faUserPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

// == Import : local
import './style.scss';

const Login = ({
    isLoginError,
    email,
    password,
    isWaitingLoginFormValidation,
    loginErrorMessage,
    props,
    setInputLoginFormValues,
    setIsWaitingLoginFormValidation,
    logIn,
    setIsLoginError
}) => {
    const { handleDisplayLoginZone } = props;

    const handleOnChangeInputForm = (e) => {
        setInputLoginFormValues(e.currentTarget.name, e.currentTarget.value);
    };

    const handleOnSubmitForm = (e) => {
        e.preventDefault();
        setIsWaitingLoginFormValidation(true);
        logIn();
    };

    return (
        <div
            className={'login'}
            tabIndex="0"
            onBlur={handleDisplayLoginZone}
        >
            <p className={'login_title'}>Connexion</p>
            <form className={'login_form'} onSubmit={handleOnSubmitForm}>
                <div className={'login_form_inputContainer'}>
                    <input
                        className={'login_form_inputContainer_input'}
                        type={'email'}
                        name={'email'}
                        required={true}
                        placeholder={'Adresse email'}
                        value={email}
                        onChange={handleOnChangeInputForm}
                    />
                    <FontAwesomeIcon className={'login_form_inputContainer_icon'} icon={faAt} />
                </div>
                <div className={'login_form_inputContainer'}>
                    <input
                        className={'login_form_inputContainer_input'}
                        type={'password'}
                        name={'password'}
                        required={true}
                        placeholder={'Mot de passe'}
                        value={password}
                        onChange={handleOnChangeInputForm}
                    />
                    <FontAwesomeIcon className={'login_form_inputContainer_icon'} icon={faLock} />
                </div>
                <button
                    className={`button login_form_button ${isWaitingLoginFormValidation ? 'loading' : ''}`}
                    type={'submit'}
                    disabled={isWaitingLoginFormValidation}
                >
                    {!isWaitingLoginFormValidation
                        ? <>
                            <FontAwesomeIcon className={'button_icon'} icon={faCheckCircle} />
                            Valider
                        </>
                        : <div className='spinnerLoader' />
                    }
                </button>
            </form>
            {isLoginError &&
                <div className={'login_errorMessage'}>
                    {loginErrorMessage}
                    <FontAwesomeIcon
                        className={'login_errorMessage_icon'}
                        icon={faTimes}
                        onClick={() => setIsLoginError(false, '')}
                    />
                </div>
            }
            <div className={'divider login_divider'} />
            <p className={'login_title'}>Pas encore de compte ?</p>
            <Link to={'/register'}>
                <button
                    className={'button login_button'}
                    onClick={handleDisplayLoginZone}
                >
                    <FontAwesomeIcon className={'button_icon'} icon={faUserPlus} />
                    Créer un compte
                </button>
            </Link>
        </div>
    );
};

export default Login;
