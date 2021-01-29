import React, { useState } from "react";
import { Link } from "react-router-dom";

import { updateBookQuantity } from "../../server/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faShoppingCart,
    faCheck,
    faTruck,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
    wishList: <FontAwesomeIcon icon={faHeart} />,
    cart: <FontAwesomeIcon icon={faShoppingCart} />,
    check: <FontAwesomeIcon icon={faCheck} />,
    truck: <FontAwesomeIcon icon={faTruck} />,
    delete: <FontAwesomeIcon icon={faTimes} />,
};

const CartItem = ({
    book,
    userData,
    setCart,
    setBooksQuantity,
    setSubtotal,
}) => {
    const calculateDiscount = (price, discount) =>
        price - (price * discount) / 100;

    const [quantity, setQuantity] = useState(book.quantity);

    const updateCartItem = (quantity) => {
        updateBookQuantity(book._id, quantity, userData.token)
            .then((cartData) => {
                const { cart, subtotalCount, subtotalPrice } = setBooksQuantity(
                    cartData
                );
                setCart(cart);
                setSubtotal([subtotalCount, subtotalPrice]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onSubmitUpdateQuantity = (event) => {
        event.preventDefault();
        updateCartItem(quantity);
    };

    const onClickRemoveItem = (event) => {
        event.preventDefault();
        updateCartItem(0);
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
            <div className="section3">
                <form onSubmit={onSubmitUpdateQuantity}>
                    <div>
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            onChange={(event) =>
                                setQuantity(event.target.value)
                            }
                            type="number"
                            min="1"
                            max="99"
                            value={quantity}
                        />
                    </div>
                    <button type="submit">Update</button>
                </form>
                <h4>
                    <span>
                        {icons.check} {"  "}
                    </span>
                    Available
                </h4>
                <h4>
                    <span>{icons.truck}</span>Free delivery
                </h4>
            </div>
            <div className="section4">
                <span>
                    {book.discountInPercentage
                        ? calculateDiscount(
                              book.price,
                              book.discountInPercentage
                          ) * book.quantity
                        : book.price * book.quantity}{" "}
                    $
                </span>
            </div>
            <div className="section5">
                <i onClick={onClickRemoveItem}>{icons.delete}</i>
            </div>
        </div>
    );
};

export default CartItem;
