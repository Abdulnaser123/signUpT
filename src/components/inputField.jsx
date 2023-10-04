/** @format */

import React from "react";
import "./InputField.css";

const Input = ({
  name,
  label,
  type,
  value,
  onChange,
  error,
  options,
  placeholder,
}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      {type === "select" ? (
        <select id={name} name={name} value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
};

export default Input;
