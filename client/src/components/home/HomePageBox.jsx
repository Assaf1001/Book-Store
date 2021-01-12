import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const HomePageBox = (props) => (
    <div className={"box " + props.class}>
        <h2>{props.header}</h2>
        {props.children}
        <Link to={props.url}>
            <button className="view-more__button">
                VIEW MORE <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </Link>
    </div>
);

export default HomePageBox;
