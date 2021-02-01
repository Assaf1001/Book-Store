import React, { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { AddItemsContext } from "../../context/AddItemsContext";
import { useHistory } from "react-router-dom";
import { addBookToCart } from "../../server/user";

import icons from "../../icons/icons";
import RemoveBookModal from "../admin/RemoveBookModal";

const Book = ({ book, setIsBlurBackground }) => {
    const { userData } = useContext(LoginContext);
    const { setIsItemAdded, setAddedBook } = useContext(AddItemsContext);
    // const [isRemoveBook, setIsRemoveBook] = useState(false);

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
                {userData.isAdmin && (
                    <div className="admin-control">
                        <h2>Admin Control</h2>
                        <button>EDIT BOOK</button>
                        <button
                        // onClick={() => {
                        //     if (isRemoveBook) {
                        //         setIsRemoveBook(false);
                        //         setIsBlurBackground(false);
                        //     } else {
                        //         setIsRemoveBook(true);
                        //         setIsBlurBackground(true);
                        //     }
                        // }}
                        >
                            REMOVE BOOK
                        </button>
                        {/* {isRemoveBook && <RemoveBookModal />} */}
                    </div>
                )}
            </div>
            {/* {userData.isAdmin && <div className="blur-background"></div> */}
        </div>
    );
};

export default Book;
