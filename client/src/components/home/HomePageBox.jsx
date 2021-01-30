import React from "react";
import { Link } from "react-router-dom";

import icons from "../../icons/icons";

const HomePageBox = (props) => (
    <div className={"box " + props.class}>
        <h2>{props.header}</h2>
        {props.children}
        <Link to={props.url}>
            <button className="view-more__button">
                VIEW MORE <span>{icons.rightArrow}</span>
            </button>
        </Link>
    </div>
);

export default HomePageBox;
