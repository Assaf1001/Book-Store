import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../../images/logo.png";

const Footer = () => {
    const onSubmitForm = (event) => {
        event.preventDefault();
    };

    return (
        <div className="footer__container">
            <div className="footer__content center">
                <div className="section1">
                    <NavLink
                        onClick={() => {
                            window.scroll(0, 0);
                        }}
                        to="/home"
                    >
                        <img src={logo} alt="logo" />
                    </NavLink>
                </div>
                <div className="section2">
                    <NavLink to="aboutUs">About us</NavLink>
                    <NavLink to="login">Log-in / Sign-up</NavLink>
                    <NavLink to="/contactUs">Contact us</NavLink>
                </div>
                <div className="section3">
                    <Link to="/">Privacy policy</Link>
                    <Link to="/">Terms & conditions</Link>
                    <Link to="/">Payment</Link>
                    <Link to="/">FAQ</Link>
                </div>
                <div className="section4">
                    <p>
                        Want to know everything about new Manga, sales and
                        discounts? <br /> subscribe to MANGA with your Email and
                        know everything first!
                    </p>
                    <form onSubmit={onSubmitForm}>
                        <input type="text" placeholder="Email adress" />
                        <button>SEND</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Footer;
