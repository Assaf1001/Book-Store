import React from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faHome } from "@fortawesome/free-solid-svg-icons";

const LoginBar = () => {
    const icons = {
        user: <FontAwesomeIcon icon={faUser} />,
        heart: <FontAwesomeIcon icon={faHeart} />,
        home: <FontAwesomeIcon icon={faHome} />,
    };

    return (
        <div className="login-bar__container">
            <div className="login-bar center">
                <div className="general">
                    <NavLink to="/home" activeClassName="login-active">
                        <span>{icons.home}</span> Home
                    </NavLink>
                </div>
                <div className="user">
                    <NavLink to="/wishList" activeClassName="login-active">
                        <span>{icons.heart}</span> Wish List
                    </NavLink>
                    <NavLink to="/login" activeClassName="login-active">
                        <span>{icons.user}</span> LogIn/SignUp
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LoginBar;
