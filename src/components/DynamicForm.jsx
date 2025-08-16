import formConfig from "./formConfig";
import "./DynamicForm.css";
import { useState } from "react";

const DynamicForm = () => {
    const[errors,setErrors]=useState({});
    const[successsMsg,setSuccessMessage]=useState("");

const validateField = (name, value, rules) => {
    if (!rules) return null;

    if (rules.required && !value) {
      return "This field is required";
    }
    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength}`;
    }
    if (rules.min && Number(value) < rules.min) {
      return `Minimum value is ${rules.min}`;
    }

    return null;
};

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        let newErrors= {};

        formConfig.forEach((field) => {
            const error = validateField(field.name, data[field.name], field.validation);
            if (error) {
                newErrors[field.name] = error;
            }
        });
         if (Object.keys(newErrors).length > 0) {
           setErrors(newErrors);
           return;
        }

        setErrors({});
        setSuccessMessage("Form submitted successfully!");
    };

    return (
        <div className="formContainer">
            {
                successsMsg ? (<h1>{successsMsg}</h1>) :(
                    <form onSubmit={handleSubmit}>
                <h1>Dynamic Form</h1>
                {formConfig.map((field) => (
                    <div key={field.name}>
                        {!(field.type === "checkbox") && (
                            <div className="label">{field.label}</div>
                        )}
                        {field.type === "select" ? (
                            <select className="input" name={field.name}>
                                {field.options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === "checkbox" ? (
                            <div className="checkbox">
                                <input
                                    className="checkboxInput"
                                    type="checkbox"
                                    name={field.name}
                                    value="true"
                                />
                                {field.label}
                            </div>
                        ) : (
                            <input
                                className="input"
                                type={field.type}
                                name={field.name}
                            />
                        )}
                          {errors[field.name] && (
              <p className="error">{errors[field.name]}</p>
            )}
                    </div>
                ))}
                <button className="submitButton" type="submit">
                    Submit
                </button>
            </form>
                )
            }
        </div>
    );
};

export default DynamicForm;
