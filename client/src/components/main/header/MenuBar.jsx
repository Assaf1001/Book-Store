import React from "react";
import { NavLink } from "react-router-dom";

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
    return (
        <div className="menu-bar__container">
            <div className="menu-bar center">
                <div className="menus">
                    <a>GENRES {icons.downArrow}</a>
                    <NavLink to="/bestSellers" activeClassName="menu-active">
                        BEST SELLERS
                    </NavLink>
                    <NavLink to="/newReleases" activeClassName="menu-active">
                        NEW RELEASES
                    </NavLink>
                    <NavLink to="/comingSoon" activeClassName="menu-active">
                        COMING SOON
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
