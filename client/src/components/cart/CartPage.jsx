import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { getCart } from "../../server/user";

import CartItem from "./CartPageItem";

import icons from "../../icons/icons";

const CartPage = () => {
    const { userData } = useContext(LoginContext);
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState([0, 0]);

    const history = useHistory();

    const setBooksQuantity = (cartData) => {
        const cart = [];
        let subtotalCount = 0;
        let subtotalPrice = 0;

        cartData.forEach((book) => {
            let isIncluded = false;
            for (let obj in cart) {
                if (cart[obj]._id === book._id) {
                    cart[obj].quantity++;
                    subtotalCount++;
                    subtotalPrice += book.price;
                    isIncluded = true;
                    break;
                }
            }
            if (!isIncluded) {
                book.quantity = 1;
                subtotalCount++;
                subtotalPrice += book.price;
                cart.push(book);
            }
        });
        return { cart, subtotalCount, subtotalPrice };
    };

    useEffect(() => {
        let isComponentExist = true;

        if (isComponentExist) {
            getCart(userData.token)
                .then((cartData) => {
                    const {
                        cart,
                        subtotalCount,
                        subtotalPrice,
                    } = setBooksQuantity(cartData);
                    setCart(cart);
                    setSubtotal([subtotalCount, subtotalPrice]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return () => (isComponentExist = false);
    }, [userData.token]);

    return (
        <div className="cart-page__container center">
            <div className="cart-page__content">
                <div className="cart__content">
                    <h1>Shopping Cart</h1>
                    {cart.length === 0 ? (
                        <h2 className="empty">CART IS EMPTY!</h2>
                    ) : (
                        cart.map((book) => (
                            <CartItem
                                key={book._id}
                                book={book}
                                userData={userData}
                                setCart={setCart}
                                setBooksQuantity={setBooksQuantity}
                                subtotal={subtotal}
                                setSubtotal={setSubtotal}
                            />
                        ))
                    )}
                </div>
                <div className="checkout__content">
                    <h2>Summary</h2>
                    <div className="checkout__box">
                        <div>
                            <h3>Subtotal ({subtotal[0]} items)</h3>
                            <h3>{subtotal[1]} $</h3>
                        </div>
                        <div>
                            <h3>Shipping</h3>
                            <h3>0 $</h3>
                        </div>
                        <div className="line"></div>
                        <div>
                            <h4>Total</h4>
                            <h4>{subtotal[1]} $</h4>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            history.push({
                                pathname: "/payment",
                                state: { total: subtotal[1], cart },
                            });
                        }}
                        disabled={cart.length === 0}
                    >
                        <p> CHECKOUT</p> <span>{icons.rightArrow}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
