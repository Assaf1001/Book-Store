import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faShoppingCart,
    faCheck,
    faTruck,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
    wishList: <FontAwesomeIcon icon={faHeart} />,
    cart: <FontAwesomeIcon icon={faShoppingCart} />,
    check: <FontAwesomeIcon icon={faCheck} />,
    truck: <FontAwesomeIcon icon={faTruck} />,
};

const Book = ({ book }) => {
    return (
        <div className="book">
            <div className="imgae__container">
                <img src={book.image} alt={book.title} />
            </div>
            <div className="book__content">
                <h1>{book.title}</h1>
                <h2>by {book.author}</h2>
                <h6>
                    {book.category} | {book.details.language} |{" "}
                    {book.details.year}
                </h6>
                <div className="price-cart">
                    <h3>{book.price} $</h3>
                    <h4>{icons.check} Available</h4>
                    <h4>{icons.truck} Free delivery worldwide</h4>
                    <div className="buttons__container">
                        <button className="wishlist-button">
                            {icons.wishList}
                        </button>
                        <button>
                            <span>{icons.cart}</span> ADD TO CART
                        </button>
                    </div>
                </div>
                <h4>Overview</h4>
                <p>{book.details.description}</p>
                <h4>Proudct details</h4>
                <div className="book__details">
                    <h5>
                        ISBN-10: <span>{book.details.isbn}</span>
                    </h5>
                    <h5>
                        Year: <span>{book.details.year}</span>
                    </h5>
                    <h5>
                        Number of pages: <span>{book.details.pages}</span>
                    </h5>
                    <h5>
                        Publisher: <span>{book.details.publisher}</span>
                    </h5>
                    <h5>
                        Language: <span>{book.details.language}</span>
                    </h5>
                    <h5>
                        Best seller rank:{" "}
                        <span>{book.details.bestSellersRank}</span>
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default Book;
