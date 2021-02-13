import React, { createRef, useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { AddItemsContext } from "../../../context/AddItemsContext";
import { logInAction } from "../../../actions/loginActions";
import { changePassword, editDetails } from "../../../server/auth";
import { saveUserOnCookie } from "../../../cookies/cookies";

import icons from "../../../icons/icons";

const MyDetails = () => {
    const { userData, dispatchUserData } = useContext(LoginContext);
    const { toggleModal, setIsChangeDetails } = useContext(AddItemsContext);
    const formInputs = createRef();
    const passwordsFromInput = createRef();

    const clearForm = (form) => {
        for (let input of form.current) {
            input.value = "";
        }
    };

    const onSubmitUpdateUser = (event) => {
        event.preventDefault();

        const update = {
            name:
                formInputs.current[0].value.trim() +
                " " +
                formInputs.current[1].value.trim(),
            email: formInputs.current[2].value.trim().toLowerCase(),
        };

        editDetails(update, userData.token)
            .then((userData) => {
                dispatchUserData(logInAction(userData));
                saveUserOnCookie(userData);
                setIsChangeDetails(true);
                toggleModal("Details updated succsessfully");
            })
            .catch((err) => toggleModal(err.message.toString()));
    };

    const onSubmitChangePassword = (event) => {
        event.preventDefault();

        const password = passwordsFromInput.current[0].value;
        const newPassword = passwordsFromInput.current[1].value;
        const repeatedNewPassword = passwordsFromInput.current[2].value;

        changePassword(
            password,
            newPassword,
            repeatedNewPassword,
            userData.token
        )
            .then(() => {
                clearForm(passwordsFromInput);
                setIsChangeDetails(true);
                toggleModal("Password Changed succsessfully");
            })
            .catch((err) => {
                setIsChangeDetails(true);
                toggleModal(err.message.toString());
            });
    };

    return (
        <div className="my-details box">
            <div className="icon">{icons.user}</div>
            <div className="content">
                <h2>My Details</h2>
                <div className="forms">
                    <form
                        onSubmit={onSubmitUpdateUser}
                        ref={formInputs}
                        className="details-form"
                    >
                        <label htmlFor="first-name">FIRST NAME</label>
                        <input
                            type="text"
                            id="first-name"
                            defaultValue={userData.user.name.split(" ")[0]}
                        />
                        <label htmlFor="last-name">LAST NAME</label>
                        <input
                            type="text"
                            id="last-name"
                            defaultValue={userData.user.name.split(" ")[1]}
                        />
                        <label htmlFor="email-adress">EMAIL ADRESS</label>
                        <input
                            type="text"
                            id="email-adress"
                            defaultValue={userData.user.email}
                        />
                        <button type="submit">SAVE CHANGES</button>
                    </form>

                    <form
                        onSubmit={onSubmitChangePassword}
                        ref={passwordsFromInput}
                        className="password-form"
                    >
                        <label htmlFor="password">PASSOWRD</label>
                        <input type="password" id="password" />
                        <label htmlFor="new-password">NEW PASSWORD</label>
                        <input type="password" id="new-password" />
                        <label htmlFor="repeat-password">REPEAT PASSOWRD</label>
                        <input type="password" name="" id="repeat-password" />
                        <button type="submit">CHANGE PASSWORD</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyDetails;
