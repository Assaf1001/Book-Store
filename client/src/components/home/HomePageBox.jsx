import React from "react";
import { Link } from "react-router-dom";

import icons from "../../icons/icons";

const HomePageBox = (props) => (
    <div
        style={{ backgroundImage: `url(${props.background})` }}
        className={"box " + props.class}
    >
        <h2>{props.header}</h2>
        {props.children}
        <Link to={props.url}>
            {props.showButton && (
                <button className="view-more__button">
                    {props.button ? props.button : "VIEW MORE"}{" "}
                    <span>{icons.rightArrow}</span>
                </button>
            )}
        </Link>
    </div>
);

export default HomePageBox;
