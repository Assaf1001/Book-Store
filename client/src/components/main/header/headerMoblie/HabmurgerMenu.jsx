import React, { Fragment, useContext, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { LoginContext } from "../../../../context/LoginContext";
import { logOutAction } from "../../../../actions/loginActions";
import { deleteUserOnCookie } from "../../../../cookies/cookies";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";

import icons from "../../../../icons/icons";

const HamburgerMenu = () => {
    const { userData, dispatchUserData } = useContext(LoginContext);
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);

    const onClickLogout = () => {
        dispatchUserData(logOutAction());
        deleteUserOnCookie();
        history.push("/home");
    };

    const toggleDrawer = (isOpen) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setIsOpen(isOpen);
    };

    const homeNav = [
        <NavLink to="/home">
            <span>{icons.home}</span> HOME
        </NavLink>,
        <NavLink to="/contactUs">
            <span>{icons.contactUs}</span> CONTACT US
        </NavLink>,
        <NavLink to="/help">
            <span>{icons.help}</span> HELP
        </NavLink>,
    ];

    const genresNav = [
        <Link to={"/genres/action"}> Action</Link>,
        <Link to={"/genres/adventure"}>Adevnture</Link>,
        <Link to={"/genres/fantasy"}> Fantasy</Link>,
        <Link to={"/genres/comedy"}> Comedy</Link>,
        <Link to={"/genres/drama"}> Drama</Link>,
        <Link to={"/genres/romance"}> Romance</Link>,
        <Link to={"/genres/horror"}> Horror</Link>,
    ];

    const menuNav = [
        <NavLink to="/bestSellers" activeClassName="menu-active">
            BEST SELLERS
        </NavLink>,
        <NavLink to="/newReleases" activeClassName="menu-active">
            NEW RELEASES
        </NavLink>,
        <NavLink to="/comingSoon" activeClassName="menu-active">
            COMING SOON
        </NavLink>,
        <NavLink to="/onSale" activeClassName="menu-active">
            ON SALE
        </NavLink>,
    ];

    const loginNav = [
        <NavLink to="/cart">
            <span>{icons.cart}</span> CART
        </NavLink>,
        <NavLink to="/wishList">
            <span>{icons.wishList}</span> WISH LIST
        </NavLink>,
        <NavLink to="/myAccount" activeClassName="login-active">
            <span>{icons.user}</span> MY ACCOUNT
        </NavLink>,
        !userData.user ? (
            <NavLink to="/login" activeClassName="login-active">
                <span>{icons.logIn}</span> LOG-IN / SIGN-UP
            </NavLink>
        ) : (
            <div className="logout" onClick={onClickLogout}>
                <span>{icons.logOut}</span> LOG-OUT
            </div>
        ),
    ];

    const list = () => (
        <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                {homeNav.map((nav, i) => (
                    <ListItem button key={i}>
                        {nav}
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {genresNav.map((nav, i) => (
                    <ListItem button key={i}>
                        {nav}
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {menuNav.map((nav, i) => (
                    <ListItem button key={i}>
                        {nav}
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {loginNav.map((nav, i) => (
                    <ListItem button key={i}>
                        {nav}
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <Fragment>
                <Button onClick={toggleDrawer(true)}>{icons.hamburger}</Button>
                <SwipeableDrawer
                    open={isOpen}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    {list()}
                </SwipeableDrawer>
            </Fragment>
        </div>
    );
};

export default HamburgerMenu;
