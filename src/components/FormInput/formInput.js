import React from "react";

const FormInput = ({ id, name, type, placeholder, value, disabled, onChange, ...other }) => (
    <>
        <label htmlFor={id}>
            {placeholder}
        </label>
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={onChange}
            {...other}
        />
    </>
);
export default FormInput;