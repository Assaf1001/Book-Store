import React from "react";
import { Link } from "react-router-dom";

const CartItem = ({ book }) => {
    const calculateDiscount = (price, discount) =>
        price - (price * discount) / 100;

    return (
        <div className="cart-item__container">
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
                        {book.price}$
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
                        )}
                        $
                    </h5>
                )}
            </div>
            <div className="section3">
                <form>
                    <div>
                        <label htmlFor="quantity">Quantity:</label>
                        <input type="number" min="0" max="99" />
                    </div>
                    <button type="submit">Update</button>
                    <button>Remove</button>
                </form>
                <h6>
                    {book.discountInPercentage
                        ? calculateDiscount(
                              book.price,
                              book.discountInPercentage
                          )
                        : book.price}
                    $
                </h6>
            </div>
        </div>
    );
};

export default CartItem;
