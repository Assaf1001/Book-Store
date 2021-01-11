import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ImagesCarouselItem = ({ image, text, button, textColor }) => (
    <div
        className="images-carousel__item"
        style={{
            backgroundImage: `url(${image})`,
        }}
    >
        <h2 style={{ color: `${textColor.toString()}` }}>{text}</h2>
        <button>
            {button} <FontAwesomeIcon icon={faChevronRight} />
        </button>
    </div>
);

export default ImagesCarouselItem;
