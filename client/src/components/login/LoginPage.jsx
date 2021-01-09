import React, { useState } from "react";
import LoginForm from "./LoginForm";

import loginBackground from "../../images/loginPageBackground.jpg";
import SingupForm from "./SingupForm";

const LoginPage = (props) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const errorMessage = props.location.state?.needToLogin
        ? "You must login!"
        : "";

    return (
        <div
            style={{ backgroundImage: `url(${loginBackground})` }}
            className="main__container"
        >
            <div className="login-form__container">
                {isLoginMode ? (
                    <LoginForm errorMessage={errorMessage} />
                ) : (
                    <SingupForm />
                )}
            </div>
            {isLoginMode ? (
                <div className="login-signup">
                    <span>Not a member yet? </span>
                    <button onClick={() => setIsLoginMode(false)}>
                        SignUp
                    </button>
                </div>
            ) : (
                <div className="login-signup">
                    <span>Already a member? </span>
                    <button onClick={() => setIsLoginMode(true)}>LogIn</button>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
