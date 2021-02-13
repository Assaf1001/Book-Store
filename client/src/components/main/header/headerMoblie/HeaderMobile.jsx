import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import icons from "../../../../icons/icons";

import logo from "../../../../images/logo.png";
import HamburgerMenu from "./HabmurgerMenu";

const HeaderMobile = () => {
    const history = useHistory();

    const OnSubmitForm = (event) => {
        event.preventDefault();
        const searchValue = event.target[0].value;

        if (searchValue.length === 0) return;
        event.target[0].value = "";
        history.push(`/searchResult/${searchValue}`);
    };

    return (
        <div className="header-moblie__container">
            <div className="menu-bar">
                <HamburgerMenu />
                <NavLink to="/home">
                    <img src={logo} alt="logo" />
                </NavLink>
                <NavLink to="/cart">
                    <span className="cart">{icons.cart}</span>
                </NavLink>
            </div>
            <div className="search-bar">
                <div className="search__container">
                    <form onSubmit={OnSubmitForm}>
                        <div className="input__container">
                            <span></span>
                            <input
                                type="text"
                                placeholder="Search by title or author"
                            />
                        </div>
                        <button type="submit">{icons.search}</button>
                    </form>
                </div>
            </div>
            <div className="gray-line"></div>
        </div>
    );
};

export default HeaderMobile;
