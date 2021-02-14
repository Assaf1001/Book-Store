import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import logo from "../../../images/logo.png";

import icons from "../../../icons/icons";

const SearchBar = () => {
    const history = useHistory();

    const OnSubmitForm = (event) => {
        event.preventDefault();
        const searchValue = event.target[0].value;

        if (searchValue.length === 0) return;
        event.target[0].value = "";
        history.push(`/searchResult/${searchValue}`);
    };

    return (
        <div className="search-bar__container">
            <div className="search-bar center">
                <NavLink to="/home">
                    <img src={logo} alt="logo" />
                </NavLink>
                <div className="search__container">
                    <form onSubmit={OnSubmitForm}>
                        <div className="input__container">
                            <span>{icons.search}</span>
                            <input
                                type="text"
                                placeholder="Search by title or author"
                            />
                        </div>
                        <button type="submit">SEARCH</button>
                    </form>
                </div>
                {/* <div className="filter-by__container">
                    <span>{icons.fliter}</span>
                    <h4>FILTER BY</h4>
                    <span>{icons.downArrow}</span>
                </div> */}
            </div>
        </div>
    );
};

export default SearchBar;
