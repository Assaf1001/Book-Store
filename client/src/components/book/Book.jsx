import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { AddItemsContext } from "../../context/AddItemsContext";
import { addBookToCart, addBookToWishList } from "../../server/user";

import icons from "../../icons/icons";

const Book = ({ book }) => {
    const { userData } = useContext(LoginContext);
    const {
        setIsItemAdded,
        setIsAddedToWishList,
        setAddedBook,
        toggleModal,
        setIsEditBook,
    } = useContext(AddItemsContext);

    const history = useHistory();

    const onClickAddToCart = () => {
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
    };

    const onClickAddToWishList = () => {
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
    };

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
                        <button
                            onClick={onClickAddToCart}
                            className="wishlist-button"
                        >
                            {icons.wishList}
                        </button>
                        <button onClick={onClickAddToWishList}>
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
                <div className="price-cart--mobile">
                    <h3>{book.price} $</h3>
                    <div>
                        <h4>{icons.check} Available</h4>
                        <h4>{icons.truck} Free delivery worldwide</h4>
                    </div>
                    <div className="buttons__container">
                        <button
                            onClick={onClickAddToCart}
                            className="wishlist-button"
                        >
                            {icons.wishList}
                        </button>
                        <button onClick={onClickAddToWishList}>
                            <span>{icons.cart}</span> ADD TO CART
                        </button>
                    </div>
                </div>
                {userData.isAdmin && (
                    <div className="admin-control">
                        <h2>Admin Control</h2>
                        <button
                            onClick={() => {
                                setIsEditBook(true);
                            }}
                        >
                            EDIT BOOK
                        </button>
                        <button
                            onClick={() => {
                                toggleModal(
                                    `Are you sure you want to remove ${book.title}?`
                                );
                            }}
                        >
                            REMOVE BOOK
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Book;
