import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { getAdminsList, removeAdmin } from "../../server/general";

import icons from "../../icons/icons";
import { AddItemsContext } from "../../context/AddItemsContext";
import AdminModal from "./AdminModal";

const AdminsList = () => {
    const { userData } = useContext(LoginContext);
    const { isModalActive, modalMessage, toggleModal } = useContext(
        AddItemsContext
    );
    const [adminsList, setAdminsList] = useState([]);

    const onclickRemoveAdmin = (adminToRemove, token) => {
        if (userData.isAdmin) {
            removeAdmin(adminToRemove, token)
                .then((removedAdminData) => {
                    toggleModal(removedAdminData.toString());
                })
                .catch((err) => {
                    toggleModal(err.toString());
                });
        }
    };

    useEffect(() => {
        getAdminsList(userData.token)
            .then((adminsListData) => {
                setAdminsList(adminsListData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userData.token, adminsList]);

    return (
        <div className="admins-list__container">
            {isModalActive && (
                <AdminModal message={modalMessage} closeButton={"CLOSE"} />
            )}
            <h1>Admins List</h1>
            {adminsList.map((admin) => (
                <div key={admin}>
                    <h3>{admin}</h3>
                    <span
                        onClick={() =>
                            onclickRemoveAdmin(admin, userData.token)
                        }
                    >
                        {icons.delete}
                    </span>
                </div>
            ))}
        </div>
    );
};
export default AdminsList;
