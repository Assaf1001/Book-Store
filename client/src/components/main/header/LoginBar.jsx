import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { LoginContext } from "../../../context/LoginContext";
import { logOutAction } from "../../../actions/loginActions";
import { deleteUserOnCookie } from "../../../cookies/cookies";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faHeart,
    faHome,
    faSignInAlt,
    faSignOutAlt,
    faEnvelope,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
    user: <FontAwesomeIcon icon={faUser} />,
    home: <FontAwesomeIcon icon={faHome} />,
    logIn: <FontAwesomeIcon icon={faSignInAlt} />,
    logOut: <FontAwesomeIcon icon={faSignOutAlt} />,
    contactUs: <FontAwesomeIcon icon={faEnvelope} />,
    help: <FontAwesomeIcon icon={faInfoCircle} />,
};

const LoginBar = () => {
    const { userData, dispatchUserData } = useContext(LoginContext);
    const history = useHistory();

    const onClickLogout = () => {
        dispatchUserData(logOutAction());
        deleteUserOnCookie();
        history.push("/home");
    };

    return (
        <div className="login-bar__container">
            <div className="login-bar center">
                <div className="general">
                    <NavLink to="/home" activeClassName="login-active">
                        <span>{icons.home}</span> HOME
                    </NavLink>
                    <NavLink to="/contactUs" activeClassName="login-active">
                        <span>{icons.contactUs}</span> CONTACT US
                    </NavLink>
                    <NavLink to="/help" activeClassName="login-active">
                        <span>{icons.help}</span> HELP
                    </NavLink>
                </div>
                {!!userData.user && (
                    <span className="greeting">
                        ~~~~~~ Hi {userData.user.name.toUpperCase()}! ~~~~~~
                    </span>
                )}
                <div className="user">
                    <NavLink to="/myAccount" activeClassName="login-active">
                        <span>{icons.user}</span> MY ACCOUNT
                    </NavLink>

                    {!userData.user ? (
                        <NavLink to="/login" activeClassName="login-active">
                            <span>{icons.logIn}</span> LOG-IN / SIGN-UP
                        </NavLink>
                    ) : (
                        <div className="logout" onClick={onClickLogout}>
                            <span>{icons.logOut}</span> LOG-OUT
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginBar;
