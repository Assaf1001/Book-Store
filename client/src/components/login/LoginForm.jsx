import React, { useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailInputValid, setIsEmailInputValid] = useState(true);
    const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const isFormValid = () => email.length === 0 || password.length === 0;

    const onInputEmailInput = (event) => {
        const theEmail = event.target.value.trim();
        if (theEmail.length > 0) {
            setEmail(theEmail);
            setIsEmailInputValid(true);
        } else {
            setEmail("");
            setIsEmailInputValid(false);
        }
    };

    const onInputPasswordInput = (event) => {
        const thePassword = event.target.value;
        if (thePassword.length > 0) {
            setPassword(thePassword);
            setIsPasswordInputValid(true);
        } else {
            setPassword("");
            setIsPasswordInputValid(false);
        }
    };

    const onSubmitForm = (event) => {
        event.preventDefault();
        console.log({ email, password });
    };

    return (
        <div className="login-form">
            <h3>LogIn</h3>
            {errorMessage !== "" && (
                <div className="error-message">{errorMessage}</div>
            )}
            <form onSubmit={onSubmitForm}>
                <label htmlFor="email">Enter your email</label>
                <input
                    placeholder="Email"
                    id="email"
                    onInput={onInputEmailInput}
                />
                {!isEmailInputValid && (
                    <div className="invalid-message">
                        You must enter your email!
                    </div>
                )}
                <label htmlFor="password">Enter your password</label>
                <input
                    placeholder="Password"
                    id="password"
                    type="password"
                    onInput={onInputPasswordInput}
                />
                {!isPasswordInputValid && (
                    <div className="invalid-message">
                        You must enter your password!
                    </div>
                )}
                <button type="submit" disabled={isFormValid()}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
