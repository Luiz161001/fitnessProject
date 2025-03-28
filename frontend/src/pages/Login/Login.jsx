import { useState, useEffect } from "react";
import React from "react";
import "../../styles/login.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const auth = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.login(formData);
    };
    return (
        <section className="log-section">
            <div className="log-box">
                <div className="log-text">
                    <h1>FitnessApp</h1>
                    <p>Log in</p>
                    <p>Don't have an account yet? <Link to="/register">Sign up</Link></p>
                </div>
                <div className="log-options">
                    <form onSubmit={handleSubmit} className="log-form-box">
                        <input onChange={handleChange} type="text" name="email" placeholder="Email address*" />
                        <input onChange={handleChange} type="password" name="password" placeholder="Password*" />
                        <button>Continue</button>
                    </form>

                    <div className="log-divider">
                        <span>OR</span>
                    </div>

                    <div className="log-btns-container">
                        <button className="log-btns" onClick={() => auth.login_with_google()} name="google">
                            <span>Login with</span>
                            <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" alt="google-logo" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;