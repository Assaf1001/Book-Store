import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { getCart } from "../../server/user";
import CartItem from "./CartPageItem";

const CartPage = () => {
    const { userData } = useContext(LoginContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getCart(userData.token)
            .then((cartData) => {
                setCart(cartData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userData.token]);

    return (
        <div className="cart-page__container center">
            <div className="cart-page__content">
                <div className="cart__content">
                    <h1>CART</h1>
                    {cart.map((book) => (
                        <CartItem key={book._id} book={book} />
                    ))}
                </div>
                <div className="checkout__content">
                    <h1>CHECKOUT</h1>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
