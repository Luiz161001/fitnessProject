import React from "react";
import "../styles/login.css";

const Login = () => {
    return (
        <section className="log-section">
            <div className="log-box">
                <form action="" className="form-box">
                    <input type="text" />
                    <input type="password" />
                </form>
                <div className="log-btns-container">
                    <button className="log-btns">Login with Google</button>
                    <button className="log-btns">Login with Facebook</button>
                </div>
            </div>
        </section>
    )
}

export default Login;