import React, { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { useAuth } from "../components/login/AuthContext";


const Register = () => {
    const auth = useAuth();
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateInput = () => {
        // if(!formData.firstName)
        //     return {ok: false, message: "Please enter your first name!"};
        // if(!formData.lastName)
        //     return {ok: false, message: "Please enter your last name!"};
        // if(!formData.email)
        //     return {ok: false, message: "Please enter your email address!"};
        // if(!formData.password)
        //     return {ok: false, message: "Please enter your password!"};

        return {ok: true}
    }

    const handleSubmit =  (e) => {
        e.preventDefault();

        const validation = validateInput();

        if(validation.ok){
            console.log(auth);
            auth.register(formData);
        }
        else {
            alert(validation.message);
        }
    }


    return (
        <section className="log-section">
            <div className="log-box">
                <div className="log-text">
                    <h1>FitnessApp</h1>
                    <p>Log in</p>
                    <p>Already have an account? <Link to="/">Sign in</Link></p>
                </div>
                <div className="log-options">
                    <form onSubmit={handleSubmit} className="log-form-box">
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