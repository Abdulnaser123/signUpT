/** @format */

// SignUpForm.js
import React, { useState, useEffect } from "react";
import Input from "./inputField"; // Import the Input component
import "./signUp.css";

import {
  validateUsername,
  validateFullName,
  validateMobile,
  validateAge,
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
} from "../validations";
import { fetchUniversities } from "../FetchData";

function SignUpForm() {
  const initialFormState = {
    fullName: "",
    name: "",
    mobile: "",
    age: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [universitiesData, setUniversitiesData] = useState([]);

  useEffect(() => {
    fetchUniversities()
      .then((data) => {
        const filteredData = data.map((university) => ({
          country: university.country,
          name: university.name,
          domains: university.domains,
        }));

        setUniversitiesData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching universities data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateUsername(formData.name)) {
      if (!formData.name) newErrors.name = "Username is required";
      else newErrors.name = "Invalid username";
    }

    if (!validateFullName(formData.fullName)) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      else newErrors.fullName = "Full name must be between 3 and 15 characters";
    }

    if (!validateMobile(formData.mobile)) {
      if (!newErrors.mobile) newErrors.mobile = "Mobile is required";
      else newErrors.mobile = "Invalid mobile number";
    }

    if (!validateAge(formData.age)) {
      newErrors.age = "Age must be between 18 and 100";
    }

    if (!validateEmail(formData.email)) {
      if (!formData.email) newErrors.email = "Email is required";
      else newErrors.email = "Invalid email address";
    }

    if (!validatePassword(formData.password)) {
      if (!formData.password) newErrors.password = "Password is required";
      newErrors.password = "Invalid password";
    }

    if (
      !validatePasswordConfirmation(formData.password, formData.confirmPassword)
    ) {
      newErrors.confirmPassword = "Password confirmation does not match";
    }

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
      setFormData(initialFormState);
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleClear = () => {
    setFormData(initialFormState);
    setErrors({});
    setSuccess(false);
  };

  const inputFieldsLeftColumn = [
    { name: "name", label: "Name", type: "text" },
    { name: "age", label: "Age", type: "text" },
    { name: "mobile", label: "Mobile", type: "text", placeholder: "05-XXXXX" },
    { name: "password", label: "Password", type: "password" },
  ];

  const inputFieldsRightColumn = [
    { name: "fullName", label: "Full Name", type: "text" },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: [
        { label: "Select a country", value: "" },
        ...universitiesData.map((data) => ({
          label: data.country,
          value: data.country,
        })),
      ],
    },
    { name: "email", label: "Email", type: "text" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
  ];

  return (
    <div className='form-container'>
      <div className='signUpTitle'>Sign Up</div>
      <form onSubmit={handleSubmit}>
        <div className='columns'>
          <div className='column'>
            {inputFieldsLeftColumn.map((field) => (
              <div key={field.name}>
                <Input
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                  placeholder={field.placeholder}
                  options={field.options}
                />
              </div>
            ))}
          </div>
          <div className='column'>
            {inputFieldsRightColumn.map((field) => (
              <div key={field.name}>
                <Input
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                  placeholder={field.placeholder}
                  options={field.options}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='button-container'>
          <button className='submit' type='submit'>
            Save
          </button>
          <button className='clear' type='button' onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
      {success && (
        <div className='success-message'>Form submitted successfully!</div>
      )}
    </div>
  );
}

export default SignUpForm;
