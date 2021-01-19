import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../../images/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faFilter,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
    search: <FontAwesomeIcon icon={faSearch} />,
    fliter: <FontAwesomeIcon icon={faFilter} />,
    downArrow: <FontAwesomeIcon icon={faChevronDown} />,
};

const SearchBar = () => {
    return (
        <div className="search-bar__container">
            <div className="search-bar center">
                <NavLink to="/home">
                    <img src={logo} alt="logo" />
                </NavLink>
                <div className="search__container">
                    <form>
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
                <div className="filter-by__container">
                    <span>{icons.fliter}</span>
                    <h4>FILTER BY</h4>
                    <span>{icons.downArrow}</span>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
