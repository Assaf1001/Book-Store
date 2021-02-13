import React from "react";
import SearchBar from "./SearchBar";
import MenuBar from "./MenuBar";
import HeaderMobile from "./headerMoblie/HeaderMobile";

const Header = () => (
    <div>
        <HeaderMobile />
        <div className="header">
            <SearchBar />
            <MenuBar />
        </div>
    </div>
);

export default Header;
