import React, { useContext, useState } from "react";

import Greeting from "./accountItems/Greeting";
import MyDetails from "./accountItems/MyDetails";
import MyOrders from "./accountItems/MyOrders";
import AdressBook from "./accountItems/AdressBook";

import icons from "../../icons/icons";
import { LoginContext } from "../../context/LoginContext";

const MyAccountMenu = ({ setActiveComponent, isDesktopMode }) => {
    const { userData } = useContext(LoginContext);

    const [activeClass, setActiveClass] = useState(["menu-active", "", "", ""]);

    const capitalizeFirstCharacter = (nameStr) => {
        const nameArr = nameStr.split(" ");
        const newArr = [];
        for (let name of nameArr) {
            newArr.push(name[0].toUpperCase() + name.slice(1));
        }
        return newArr.join(" ");
    };

    const onClickChangeComponent = (componentName) => {
        switch (componentName) {
            case "greeting":
                setActiveComponent(
                    <Greeting setActiveComponent={setActiveComponent} />
                );
                setActiveClass(["menu-active", "", "", ""]);
                break;
            case "myDetails":
                setActiveComponent(<MyDetails />);
                setActiveClass(["", "menu-active", "", ""]);
                break;
            case "myOrders":
                setActiveComponent(<MyOrders />);
                setActiveClass(["", "", "menu-active", ""]);
                break;
            case "adressBook":
                setActiveComponent(<AdressBook />);
                setActiveClass(["", "", "", "menu-active"]);
                break;
            default:
                return;
        }
    };

    return (
        <div className="menu__container">
            <div
                onClick={() => onClickChangeComponent("greeting")}
                className={activeClass[0]}
            >
                Hi {userData.isAdmin && "Admin"}, {isDesktopMode ? <br /> : ""}{" "}
                {capitalizeFirstCharacter(userData.user.name)}
            </div>
            <div
                onClick={() => onClickChangeComponent("myDetails")}
                className={activeClass[1]}
            >
                <span>{icons.user}</span> My Details
            </div>
            <div
                onClick={() => onClickChangeComponent("myOrders")}
                className={activeClass[2]}
            >
                <span>{icons.cart}</span> My Orders
            </div>
            <div
                onClick={() => onClickChangeComponent("adressBook")}
                className={activeClass[3]}
            >
                <span>{icons.home}</span> Adress Book
            </div>
            <div>
                <span>{icons.creditCard}</span> Payment Methods
            </div>
            <div>
                <span>{icons.help}</span> Help
            </div>
        </div>
    );
};

export default MyAccountMenu;
