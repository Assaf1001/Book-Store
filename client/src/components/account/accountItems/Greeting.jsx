import React, { useContext } from "react";

import { LoginContext } from "../../../context/LoginContext";

import backgroundImage from "../../../images/SevenDeadlySins.jpg";
import AddAdmin from "../../admin/AddAdmin";
import AddBook from "../../admin/AddBook";
import AdminsList from "../../admin/AdminsList";

const Greeting = ({ setActiveComponent }) => {
    const { userData } = useContext(LoginContext);

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
        </div>
    );
};

export default Greeting;
