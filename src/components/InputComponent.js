import React from 'react'

export default function InputComponent({ ref, name, value, onChange, autoFocus = false, placeholder, type, inputMode, className }) {
    function handleChange(event) {
        if (onChange) {
            onChange(event);
        }
    }

    return (
        <input
            ref={ref}
            autoFocus={autoFocus}
            value={value}
            className={`p-3 my-1 rounded-full focus:border-primary border border-slate-500 ${className}`}
            type={type}
            inputMode={inputMode}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
        />
    )
}

InputComponent.defaultProps = {
    onChange: undefined, // provide a default value for onChange prop
};

