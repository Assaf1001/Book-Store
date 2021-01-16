import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faHeart,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const icons = {
    view: <FontAwesomeIcon icon={faEye} />,
    wishList: <FontAwesomeIcon icon={faHeart} />,
    cart: <FontAwesomeIcon icon={faShoppingCart} />,
};

const BooksCarouselItem = ({ book }) => {
    const calculateDiscount = (price, discount) =>
        price - (price * discount) / 100;

    return (
        <div className="books-carousel__item">
            <Link to={`/book/${book._id}`}>
                <img src={book.image} alt={book.title} />
            </Link>

            <h4>{book.title}</h4>
            <h5>{book.author}</h5>
            <div style={{ display: "flex" }}>
                <h6
                    style={
                        book.discountInPercentage && {
                            textDecoration: "line-through",
                            fontWeight: "300",
                        }
                    }
                >
                    {book.price}$
                </h6>
                {book.discountInPercentage && (
                    <span> -{book.discountInPercentage}%</span>
                )}
            </div>
            {book.discountInPercentage && (
                <h6>
                    {calculateDiscount(book.price, book.discountInPercentage)}$
                </h6>
            )}
            <div className="buttons-container">
                <div className="top-button">
                    <Link to={`/book/${book._id}`}>
                        {" "}
                        <p>{icons.view} VIEW</p>{" "}
                    </Link>
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
};

export default BooksCarouselItem;
