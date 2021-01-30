import React from "react";

import icons from "../../../icons/icons";

const ImagesCarouselItem = ({ image, text, button, textColor }) => (
    <div
        className="images-carousel__item"
        style={{
            backgroundImage: `url(${image})`,
        }}
    >
        <h2 style={{ color: `${textColor.toString()}` }}>{text}</h2>
        <button>
            {button} {icons.rightArrow}
        </button>
    </div>
);

export default ImagesCarouselItem;
