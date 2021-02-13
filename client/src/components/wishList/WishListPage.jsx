import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import {
    emptyWishList,
    getWishList,
    moveAllBooksFromWishListToCart,
} from "../../server/user";

import WishListItem from "./WishListPageItem";

import icons from "../../icons/icons";

const WishListPage = () => {
    const { userData } = useContext(LoginContext);
    const [wishList, setWishList] = useState([]);

    useEffect(() => {
        let isComponentExist = true;

        if (isComponentExist) {
            getWishList(userData.token)
                .then((wishListData) => {
                    setWishList(wishListData);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return () => (isComponentExist = false);
    }, [userData.token]);

    const onClickMoveAllToCart = () => {
        const bookList = [];
        for (let book of wishList) {
            bookList.unshift(book._id);
        }

        moveAllBooksFromWishListToCart(bookList, userData.token)
            .then(() => setWishList([]))
            .catch((err) => console.log(err));
    };

    return (
        <div className="cart-page__container center">
            <div className="cart-page__content">
                <div className="cart__content">
                    <h1>Wish List</h1>
                    {wishList.length === 0 ? (
                        <h2 className="empty">WISH LIST IS EMPTY!</h2>
                    ) : (
                        wishList.map((book) => (
                            <WishListItem
                                key={book._id}
                                book={book}
                                userData={userData}
                                setWishList={setWishList}
                            />
                        ))
                    )}
                </div>
                <div className="checkout__content">
                    <h2>Controls</h2>
                    <button
                        onClick={onClickMoveAllToCart}
                        disabled={wishList.length === 0}
                    >
                        <p> MOVE ALL TO CART</p> <span>{icons.cart}</span>
                    </button>
                    <button
                        onClick={() => {
                            emptyWishList(userData.token)
                                .then((wishListData) => {
                                    setWishList(wishListData);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }}
                        disabled={wishList.length === 0}
                    >
                        <p> EMPTY WISH LIST </p>
                        <span>{icons.delete}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WishListPage;
