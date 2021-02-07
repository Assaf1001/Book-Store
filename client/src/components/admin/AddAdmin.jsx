import React, { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { addAdmin } from "../../server/general";
import { AddItemsContext } from "../../context/AddItemsContext";
import AdminModal from "./AdminModal";

const AddAdmin = () => {
    const { userData } = useContext(LoginContext);
    const { isModalActive, modalMessage, toggleModal } = useContext(
        AddItemsContext
    );

    const onSubmitForm = (event, token) => {
        event.preventDefault();

        const adminEmail = event.target[0].value.trim().toLowerCase();

        if (userData.isAdmin) {
            addAdmin(adminEmail, token)
                .then((newAdminData) => {
                    toggleModal(newAdminData.toString());
                })
                .catch((err) => {
                    toggleModal(err.toString());
                });
        }
    };

    return (
        <div className="add-admin__container">
            {isModalActive && (
                <AdminModal message={modalMessage} closeButton={"CLOSE"} />
            )}
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
