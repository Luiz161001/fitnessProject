import React, { useState, useEffect } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <section className="log-section">
            <div className="log-box">
                <div className="log-text">
                    <h1>FitnessApp</h1>
                    <p>Log in</p>
                    <p>Already have an account? <Link to="/">Sign in</Link></p>
                </div>
                <div className="log-options">
                    <form action="" className="log-form-box">
                        <input onChange={handleChange} type="text" name="firstName" placeholder="First Name*" />
                        <input onChange={handleChange} type="text" name="lastName" placeholder="Last Name*" />
                        <input onChange={handleChange} type="text" name="email" placeholder="Email address*" />
                        <input onChange={handleChange} type="password" name="password" placeholder="Password*" />
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register;