import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

import icons from "../../icons/icons";

const PurchasedModal = ({ orderNumber }) => {
    const { userData } = useContext(LoginContext);
    const userFirstName = userData.user.name.split(" ")[0].toUpperCase();

    return (
        <div className="purchased-modal">
            <div className="purchased-modal__content">
                <div className="circle">
                    <span>{icons.check}</span>
                </div>
                <h1>THANK YOU {userFirstName}! </h1>
                <h2>Your order completed successfully</h2>
                <h3>
                    The order details sent via Email to {userData.user.email}
                    <br /> Order number #{orderNumber}
                </h3>
                <div className="buttons">
                    <Link to="/home">
                        <span>{icons.home}</span> HOME
                    </Link>
                    <Link to="/myAccount">
                        <span>{icons.user}</span> MY ACCOUNT
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PurchasedModal;
