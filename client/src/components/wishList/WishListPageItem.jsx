import React from "react";
import { Link } from "react-router-dom";
import {
    moveBookFromWishListToCart,
    removeBookFromWishList,
} from "../../server/user";

import icons from "../../icons/icons";

const WishListItem = ({ book, userData, setWishList }) => {
    const calculateDiscount = (price, discount) =>
        price - (price * discount) / 100;

    const onClickMoveToCart = () => {
        moveBookFromWishListToCart(book._id, userData.token)
            .then((wishListData) => setWishList(wishListData))
            .catch((err) => console.log(err));
    };

    const onClickRemoveItem = () => {
        removeBookFromWishList(book._id, userData.token)
            .then((wishListData) => setWishList(wishListData))
            .catch((err) => console.log(err));
    };

    return (
        <div className="cart-item__container">
            <div className="left">
                <div className="section1">
                    <Link to={`/book/${book._id}`}>
                        <img src={book.image} alt={book.title} />
                    </Link>
                </div>
                <div className="section2">
                    <h2>{book.title}</h2>
                    <h3>{book.author}</h3>
                    <h4>
                        {book.category} | {book.details.language}
                    </h4>
                    <div style={{ display: "flex" }}>
                        <h5
                            style={
                                book.discountInPercentage && {
                                    textDecoration: "line-through",
                                    fontWeight: "300",
                                }
                            }
                        >
                            {book.price} $
                        </h5>
                        {book.discountInPercentage && (
                            <span> -{book.discountInPercentage}%</span>
                        )}
                    </div>
                    {book.discountInPercentage && (
                        <h5>
                            {calculateDiscount(
                                book.price,
                                book.discountInPercentage
                            )}{" "}
                            $
                        </h5>
                    )}
                </div>
            </div>
            <div className="right">
                <div className="section3">
                    <button
                        className="move-to-cart-button"
                        onClick={onClickMoveToCart}
                    >
                        <p> MOVE TO CART </p>
                        <span> {icons.cart}</span>
                    </button>
                </div>
                <div className="section5">
                    <i onClick={onClickRemoveItem}>{icons.delete}</i>
                </div>
            </div>
        </div>
    );
};

export default WishListItem;
