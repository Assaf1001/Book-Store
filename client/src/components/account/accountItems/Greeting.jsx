import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../../context/LoginContext";
import { AddItemsContext } from "../../../context/AddItemsContext";
import { logOutAction } from "../../../actions/loginActions";
import { logOutFromAllDevices } from "../../../server/auth";
import { deleteUserOnCookie } from "../../../cookies/cookies";

import AddAdmin from "../../admin/AddAdmin";
import AddBook from "../../admin/AddBook";
import AdminsList from "../../admin/AdminsList";

import backgroundImage from "../../../images/SevenDeadlySins.jpg";

const Greeting = ({ setActiveComponent }) => {
    const { userData, dispatchUserData } = useContext(LoginContext);
    const { toggleModal } = useContext(AddItemsContext);
    const history = useHistory();

    const onClickLogOutAllDevices = () => {
        logOutFromAllDevices(userData.token)
            .then(() => {
                dispatchUserData(logOutAction());
                deleteUserOnCookie();
                history.push("/home");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div
            className="greeting"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <h1>WELCOME TO YOUR ACCOUNT</h1>
            {userData.isAdmin && (
                <div className="admin-options">
                    <h2>Admin Control</h2>
                    <button onClick={() => setActiveComponent(<AddBook />)}>
                        ADD BOOK
                    </button>
                    <button onClick={() => setActiveComponent(<AdminsList />)}>
                        MANAGE ADMINS LIST
                    </button>
                    <button onClick={() => setActiveComponent(<AddAdmin />)}>
                        ADD ADMIN USER
                    </button>
                </div>
            )}
            <div className="buttons">
                <button onClick={onClickLogOutAllDevices}>
                    LOGOUT ALL DEVICES
                </button>
                <button
                    onClick={() =>
                        toggleModal(
                            "Are you sure you want to delete your account?"
                        )
                    }
                    className="delete-button"
                >
                    DELETE ACCOUNT
                </button>
            </div>
        </div>
    );
};

export default Greeting;
