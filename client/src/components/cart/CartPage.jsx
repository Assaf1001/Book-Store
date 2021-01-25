import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { getCart } from "../../server/user";
import CartItem from "./CartPageItem";

const CartPage = () => {
    const { userData } = useContext(LoginContext);
    const [cart, setCart] = useState([]);

    const setBooksQuantity = (cartData) => {
        const cart = [];
        cartData.forEach((book) => {
            let isIncluded = false;
            for (let obj in cart) {
                if (cart[obj]._id === book._id) {
                    cart[obj].quantity++;
                    isIncluded = true;
                    break;
                }
            }
            if (!isIncluded) {
                book.quantity = 1;
                cart.push(book);
            }
        });
        return cart;
    };

    useEffect(() => {
        getCart(userData.token)
            .then((cartData) => {
                const cart = setBooksQuantity(cartData);
                setCart(cart);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userData.token]);

    return (
        <div className="cart-page__container center">
            <div className="cart-page__content">
                <div className="cart__content">
                    <h1>Shopping Cart</h1>
                    {cart.map((book) => (
                        <CartItem
                            key={book._id}
                            book={book}
                            userData={userData}
                            setCart={setCart}
                            setBooksQuantity={setBooksQuantity}
                        />
                    ))}
                </div>
                <div className="checkout__content">
                    <h2>Summary</h2>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
