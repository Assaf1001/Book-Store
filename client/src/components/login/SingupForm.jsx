import React, { useState } from "react";
import validator from "validator";

const SingupForm = () => {
    // const { dispachUserData } = useContext(LoginContext);

    const [inputClasses, setInputClasses] = useState(["", "", "", ""]);
    const [invalidMessages, setInvalidMessages] = useState(["", "", "", ""]);
    const [validInputs, setValidInputs] = useState([
        false,
        false,
        false,
        false,
    ]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeated, setPasswordRepeated] = useState("");

    // const history = useHistory();

    const isFormInvalid = () => validInputs.includes(false);

    const validateInput = (
        value,
        inputindex,
        setValue,
        missingValueMessage
    ) => {
        const setStateOfInputs = (message, inputClass, isvalidInput) => {
            const newInavlidMessages = [...invalidMessages];
            const newInputClasses = [...inputClasses];
            const newValidInputs = [...validInputs];
            newInavlidMessages[inputindex] = message;
            setInvalidMessages(newInavlidMessages);
            newInputClasses[inputindex] = inputClass;
            setInputClasses(newInputClasses);
            newValidInputs[inputindex] = isvalidInput;
            setValidInputs(newValidInputs);
        };

        if (value.length > 0) {
            setStateOfInputs("", "", true);
            setValue(value);
        } else {
            setStateOfInputs(missingValueMessage, "input-invalid", false);
        }
    };

    const onSubmitIsValidInputs = () => {
        const isPasswordValidFunc = () => {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            return passwordRegex.test(password);
        };
        const isPasswordRepeatedValidFunc = () => password === passwordRepeated;

        const isEmailValid = validator.isEmail(email);
        const isPasswordValid = isPasswordValidFunc();
        const isPasswordRepeatedValid = isPasswordRepeatedValidFunc();

        setInputClasses([
            "",
            isEmailValid ? "" : "input-invalid",
            isPasswordValid ? "" : "input-invalid",
            isPasswordRepeatedValid ? "" : "input-invalid",
        ]);
        setInvalidMessages([
            "",
            isEmailValid ? "" : "Email invalid",
            isPasswordValid
                ? ""
                : "Password must contain capital and regular characters, numbers and must have at least 8 character",
            isPasswordRepeatedValid
                ? ""
                : "The two passwords are not identical",
        ]);
        setValidInputs([
            true,
            isEmailValid,
            isPasswordValid,
            isPasswordRepeatedValid,
        ]);
    };

    const onInputMame = (event) => {
        const newName = event.target.value.trim();
        validateInput(newName, 0, setName, "Please enter your name");
    };

    const onInputEmail = (event) => {
        const newEmail = event.target.value.trim();

        validateInput(newEmail, 1, setEmail, "Please enter your email");
    };

    const onInputPassword = (event) => {
        const newPassword = event.target.value;
        validateInput(newPassword, 2, setPassword, "Please enter a password");
    };

    const onInputPasswordRepeated = (event) => {
        const newPasswordRepeated = event.target.value;
        validateInput(
            newPasswordRepeated,
            3,
            setPasswordRepeated,
            "Please repeat your password"
        );
    };

    // const onSubmitform = (event) => {
    //     event.preventDefault();
    //     signUpToSite(email, password)
    //         .then((userData) => {
    //             dispachUserData(loginAction(userData));
    //             saveUserOnCookie(userData);
    //             history.push("/rooms");
    //         })
    //         .catch((err) => {
    //             if (err.message === "EMAIL_EXISTS") {
    //                 setInputClasses(["", "", "input-invalid", "", ""]);
    //                 setInvalidMessages([
    //                     "",
    //                     "",
    //                     "Email is already in use!",
    //                     "",
    //                     "",
    //                 ]);
    //                 setValidInputs([true, true, false, true, true]);
    //             }
    //         });
    // };

    const onSubmitForm = (event) => {
        event.preventDefault();

        onSubmitIsValidInputs();

        console.log({ name, email, password });
    };

    // const onClickLogin = () => {
    //     props.setIsLoginMode(true);
    // };

    return (
        <div className="login-form">
            <h3>SignUp</h3>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="name">Enter your name</label>
                <input
                    id="name"
                    placeholder="Name"
                    className={inputClasses[0]}
                    onInput={onInputMame}
                />
                {invalidMessages[0] !== "" && (
                    <div className="invalid-message">{invalidMessages[0]}</div>
                )}
                <label htmlFor="email">Enter your email</label>
                <input
                    id="email"
                    placeholder="Email"
                    className={inputClasses[1]}
                    onInput={onInputEmail}
                />
                {invalidMessages[1] !== "" && (
                    <div className="invalid-message">{invalidMessages[1]}</div>
                )}
                <label htmlFor="password">Create a password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className={inputClasses[2]}
                    onInput={onInputPassword}
                />
                {invalidMessages[2] !== "" && (
                    <div className="invalid-message">{invalidMessages[2]}</div>
                )}
                <label htmlFor="repeat-password">Repeat your password</label>
                <input
                    id="repeat-password"
                    type="password"
                    placeholder="Repeat password"
                    className={inputClasses[3]}
                    onInput={onInputPasswordRepeated}
                />
                {invalidMessages[3] !== "" && (
                    <div className="invalid-message">{invalidMessages[3]}</div>
                )}

                <button type="submit" disabled={isFormInvalid()}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SingupForm;
