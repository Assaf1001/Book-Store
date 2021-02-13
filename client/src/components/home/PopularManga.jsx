import React from "react";

import NarutoFace from "../../images/NarutoFace.png";
import TokyoGhoulFace from "../../images/TokyoGhoulFace.jpg";

import icons from "../../icons/icons";
import { useHistory } from "react-router-dom";

const PopularManga = () => {
    const history = useHistory();
    return (
        <div className="popular-manga__container">
            <div className="popular-manga__conenet">
                <img src={NarutoFace} alt="NarutoFace" />
                <p> Naruto</p>
                <button
                    onClick={() => history.push("/searchResult/Naruto")}
                    className="view-more__button"
                >
                    VIEW MORE
                    <span>{icons.rightArrow}</span>
                </button>
            </div>
            <div className="popular-manga__conenet">
                <img src={TokyoGhoulFace} alt="TokyoGhoulFace" />
                <p> Tokyo Ghoul</p>
                <button
                    onClick={() => history.push("/searchResult/Tokyo Ghoul")}
                    className="view-more__button"
                >
                    VIEW MORE
                    <span>{icons.rightArrow}</span>
                </button>
            </div>
        </div>
    );
};

export default PopularManga;
