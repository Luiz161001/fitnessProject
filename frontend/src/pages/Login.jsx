import React from "react";
import "../styles/login.css";

const Login = () => {
    return (
        <section className="log-section">
            <div className="log-box">
                <div className="log-text">
                    <h1>FitnessApp</h1>
                    <p>Welcome</p>
                </div>
                <div className="log-options">
                    <form action="" className="log-form-box">
                        <input type="text" placeholder="Email address*" />
                        <button>Continue</button>
                    </form>

                    <div className="log-divider">
                        <span>OR</span>
                    </div>

                    <div className="log-btns-container">
                        <button className="log-btns">Login with Google</button>
                        <button className="log-btns">Login with Facebook</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;