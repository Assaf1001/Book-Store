import React from "react";
import LoginBar from "./LoginBar";
import SearchBar from "./SearchBar";
import MenuBar from "./MenuBar";

const Header = () => (
    <div className="header">
        <LoginBar />
        <SearchBar />
        <MenuBar />
    </div>
);

export default Header;
