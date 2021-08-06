// == Import : npm
import React from 'react';

// == Import : components
import Form from "../../../containers/form";

// == Import : local
import './style.scss';

const RegisterForm = () => {
    return (
        <div className={'registerForm'}>
            <h2 className={'title'}>Je créé mon compte ...</h2>
            <Form />
        </div>
    );
};

export default RegisterForm;
