import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faHeart,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
    downArrow: <FontAwesomeIcon icon={faChevronDown} />,
    wishList: <FontAwesomeIcon icon={faHeart} />,
    cart: <FontAwesomeIcon icon={faShoppingCart} />,
};

const MenuBar = () => {
    const [dropDownClassName, setdropDownClassName] = useState("");

    const onClickDropDown = () => {
        if (
            dropDownClassName === "" ||
            dropDownClassName === "animate__slide-up"
        ) {
            setdropDownClassName("animate__slide-down");
        } else {
            setdropDownClassName("animate__slide-up");
        }
    };

    window.onclick = (event) => {
        if (
            dropDownClassName === "animate__slide-down" &&
            !event.target.parentNode.matches(".dropdown-menu") &&
            !event.target.parentNode.parentNode.matches(".dropdown-menu") &&
            !event.target.matches("path")
        ) {
            setdropDownClassName("animate__slide-up");
        }
    };

    return (
        <div className="menu-bar__container">
            <div className="menu-bar center">
                <div className="menus">
                    <div className="dropdown-menu">
                        <h3 onClick={onClickDropDown}>
                            GENRES {icons.downArrow}
                        </h3>
                        <ul className={dropDownClassName}>
                            <li>
                                <Link to={"/genres/action"}> Action</Link>
                            </li>
                            <li>
                                <Link to={"/genres/adventure"}>Adevnture</Link>
                            </li>
                            <li>Drama</li>
                            <li>Adevnture</li>
                            <li>Adevnture</li>
                            <li>Adevnture</li>
                            <li>Adevnture</li>
                        </ul>
                    </div>
                    <NavLink to="/bestSellers" activeClassName="menu-active">
                        BEST SELLERS
                    </NavLink>
                    <NavLink to="/newReleases" activeClassName="menu-active">
                        NEW RELEASES
                    </NavLink>
                    <NavLink to="/comingSoon" activeClassName="menu-active">
                        COMING SOON
                    </NavLink>
                    <NavLink to="/onSale" activeClassName="menu-active">
                        ON SALE
                    </NavLink>
                </div>
                <div className="items">
                    <NavLink to="/wishList">
                        <span>{icons.wishList}</span> WISH LIST
                    </NavLink>
                    <NavLink to="/cart">
                        <span>{icons.cart}</span> CART
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default MenuBar;
