import React, { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { addAdmin } from "../../server/general";

import validator from "validator";

const AddAdmin = () => {
    const { userData } = useContext(LoginContext);

    const onSubmitForm = (event, token) => {
        event.preventDefault();

        const adminEmail = event.target[0].value.trim().toLowerCase();

        if (adminEmail.length === 0) return;
        if (!validator.isEmail(adminEmail)) return;

        addAdmin(adminEmail, token)
            .then((adminsListData) => {
                console.log(adminsListData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="add-admin__container">
            <h1>Add Admin</h1>
            <form onSubmit={(event) => onSubmitForm(event, userData.token)}>
                <label htmlFor="adminEmail">ADMIN EMAIL</label>
                <input
                    type="text"
                    id="adminEmail"
                    placeholder="Enter new admin email"
                />
                <button type="submit">ADD ADMIN</button>
            </form>
        </div>
    );
};
export default AddAdmin;
