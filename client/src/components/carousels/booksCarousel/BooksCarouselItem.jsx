import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faHeart,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
    view: <FontAwesomeIcon icon={faEye} />,
    wishList: <FontAwesomeIcon icon={faHeart} />,
    cart: <FontAwesomeIcon icon={faShoppingCart} />,
};

const BooksCarouselItem = ({ book }) => (
    <div className="books-carousel__item">
        <a href="/">
            <img src={book.image} alt={book.title} />
        </a>
        <h4>{book.title}</h4>
        <h5>{book.author}</h5>
        <h6>{book.price}$</h6>
        <div className="buttons-container">
            <div className="top-button">
                <p>{icons.view} VIEW</p>
            </div>
            <div className="bottom-container">
                <div className="bottom-button">
                    <p>{icons.wishList} WISH</p>
                </div>
                <div className="bottom-button __2">
                    <p>{icons.cart} ADD</p>
                </div>
            </div>
        </div>
    </div>
);

export default BooksCarouselItem;
