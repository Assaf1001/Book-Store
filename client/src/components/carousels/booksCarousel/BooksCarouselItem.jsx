import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginContext } from "../../../context/LoginContext";
import { AddItemsContext } from "../../../context/AddItemsContext";
import { addBookToCart, addBookToWishList } from "../../../server/user";

import icons from "../../../icons/icons";

const BooksCarouselItem = ({ book }) => {
    const { userData } = useContext(LoginContext);
    const {
        setIsItemAdded,
        setIsAddedToWishList,
        setAddedBook,
        toggleModal,
    } = useContext(AddItemsContext);
    const history = useHistory();

    const calculateDiscount = (price, discount) =>
        Math.floor(price - (price * discount) / 100);

    return (
        <div className="books-carousel__item">
            <Link to={`/book/${book._id}`}>
                <img src={book.image} alt={book.title} />
            </Link>

            <Link to={`/book/${book._id}`}>
                <h4>{book.title}</h4>
            </Link>

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
                    <div>
                        <Link to={`/book/${book._id}`}>
                            {" "}
                            <p>{icons.view} VIEW</p>{" "}
                        </Link>
                    </div>
                </div>
                <div className="bottom-container">
                    <div
                        onClick={() => {
                            if (userData.user) {
                                addBookToWishList(book._id, userData.token)
                                    .then(() => {
                                        setIsItemAdded(true);
                                        setIsAddedToWishList(true);
                                        setAddedBook(book);
                                    })
                                    .catch((err) => {
                                        setIsAddedToWishList(true);
                                        toggleModal(err.message.toString());
                                    });
                            } else {
                                history.push("/myAccount");
                            }
                        }}
                        className="bottom-button"
                    >
                        <p>{icons.wishList} WISH</p>
                    </div>
                    <div
                        onClick={() => {
                            if (userData.user) {
                                addBookToCart(book._id, userData.token)
                                    .then(() => {
                                        setIsItemAdded(true);
                                        setAddedBook(book);
                                    })
                                    .catch((err) => console.log(err));
                            } else {
                                history.push("/myAccount");
                            }
                        }}
                        className="bottom-button __2"
                    >
                        <p>{icons.cart} ADD</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BooksCarouselItem;
