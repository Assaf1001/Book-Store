import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faHeart,
    faHome,
    faSignInAlt,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../../../context/LoginContext";
import { logOutAction } from "../../../actions/loginAction";
import { deleteUserOnCookie } from "../../../cookies/cookies";

const LoginBar = () => {
    const { userData, dispatchUserData } = useContext(LoginContext);
    const history = useHistory();

    const icons = {
        user: <FontAwesomeIcon icon={faUser} />,
        heart: <FontAwesomeIcon icon={faHeart} />,
        home: <FontAwesomeIcon icon={faHome} />,
        logIn: <FontAwesomeIcon icon={faSignInAlt} />,
        logOut: <FontAwesomeIcon icon={faSignOutAlt} />,
    };

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
                        <span>{icons.home}</span> Home
                    </NavLink>
                </div>
                {!!userData.user && (
                    <span>~~~~~~ Hi {userData.user.name}! ~~~~~~</span>
                )}
                <div className="user">
                    <NavLink to="/wishList" activeClassName="login-active">
                        <span>{icons.heart}</span> Wish List
                    </NavLink>

                    <NavLink to="/myAccount" activeClassName="login-active">
                        <span>{icons.user}</span> My Account
                    </NavLink>

                    {!userData.user ? (
                        <NavLink to="/login" activeClassName="login-active">
                            <span>{icons.logIn}</span> LogIn/SignUp
                        </NavLink>
                    ) : (
                        <div className="logout" onClick={onClickLogout}>
                            <span>{icons.logOut}</span> LogOut
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginBar;
