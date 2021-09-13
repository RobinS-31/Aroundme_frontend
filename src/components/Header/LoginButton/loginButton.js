// == Import : npm
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

// == Import : components
import Login from '../../../containers/login';
import Logout from '../../../containers/logout';

// == Import : local
import './style.scss';

const LoginButton = ({ userConnected }) => {
    const [displayLoginZone, setDisplayLoginZone] = useState(false);
    const [isInLoginZone, setIsInLoginZone] = useState(false);
    const loginButtonContainer = useRef(null);

    const handleDisplayLoginZone = (e) => {
        if (e._reactName === 'onBlur' && !isInLoginZone) {
            loginButtonContainer.current.classList.remove("show");
            setTimeout(() => {
                setDisplayLoginZone(false);
            }, 150);
        }
        if (e._reactName === 'onClick') {
            if (loginButtonContainer.current.classList.contains("show")) {
                setTimeout(() => {
                    setDisplayLoginZone(!displayLoginZone);
                }, 150);
                loginButtonContainer.current.classList.remove("show");
            } else {
                setDisplayLoginZone(!displayLoginZone);
                loginButtonContainer.current.classList.add("show");
            }
        }
    };

    const handleOnMouseEnterOrLeaveLoginZone = (e) => {
        if (e._reactName === 'onMouseEnter') setIsInLoginZone(true);
        if (e._reactName === 'onMouseLeave') setIsInLoginZone(false);
    };

    return (
        <div
            className={'loginButton'}
            onMouseEnter={handleOnMouseEnterOrLeaveLoginZone}
            onMouseLeave={handleOnMouseEnterOrLeaveLoginZone}
        >
            <button
                className={'loginButton_button'}
                onClick={handleDisplayLoginZone}
                onBlur={handleDisplayLoginZone}
            >
                <FontAwesomeIcon className='loginButton_button_icon' icon={faUserAlt} />
            </button>
            <div className={'loginButton_container'} ref={loginButtonContainer}>
                {displayLoginZone && !userConnected &&
                    <Login handleDisplayLoginZone={handleDisplayLoginZone} />
                }
                {displayLoginZone && userConnected &&
                    <Logout handleDisplayLoginZone={handleDisplayLoginZone} />
                }
            </div>
        </div>
    );
};
export default LoginButton;
