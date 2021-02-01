import React from "react";
import { useHistory } from "react-router-dom";

import icons from "../../../icons/icons";

const ImagesCarouselItem = ({ img, text, button, textColor, to }) => {
    const history = useHistory();

    return (
        <div
            className="images-carousel__item"
            style={{
                backgroundImage: `url(${img})`,
            }}
        >
            <h2 style={{ color: `${textColor.toString()}` }}>{text}</h2>
            <button
                onClick={() => {
                    history.push(button === "SIGN UP" ? JSON.parse(to) : to);
                }}
            >
                {button} {icons.rightArrow}
            </button>
        </div>
    );
};

export default ImagesCarouselItem;
