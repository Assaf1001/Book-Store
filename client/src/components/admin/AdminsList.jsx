import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { getAdminsList, removeAdmin } from "../../server/general";

import icons from "../../icons/icons";

const AdminsList = () => {
    const { userData } = useContext(LoginContext);
    const [adminsList, setAdminsList] = useState([]);

    const onclickRemoveAdmin = (admin, token) => {
        if (adminsList.length <= 1) return;

        removeAdmin(admin, token)
            .then((adminsListData) => {
                // console.log(adminsListData);
            })
            .catch((err) => {
                console.log(err);
            });
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
