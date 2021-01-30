import React, { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { AddItemsContext } from "../../context/AddItemsContext";
import { useHistory } from "react-router-dom";
import { addBookToCart } from "../../server/user";

import icons from "../../icons/icons";

const Book = ({ book }) => {
    const { userData } = useContext(LoginContext);
    const { setIsItemAdded, setAddedBook } = useContext(AddItemsContext);

    const history = useHistory();

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
                        <button
                            onClick={() => {
                                if (userData.user) {
                                    addBookToCart(book._id, userData.token);
                                    setIsItemAdded(true);
                                    setAddedBook(book);
                                } else {
                                    history.push("/myAccount");
                                }
                            }}
                        >
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
