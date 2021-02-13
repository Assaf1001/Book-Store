import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AddItemsContext } from "../../../context/AddItemsContext";

import icons from "../../../icons/icons";

const AddToCartModal = () => {
    const {
        setIsItemAdded,
        isAddedToWishList,
        setIsAddedToWishList,
        addedBook,
    } = useContext(AddItemsContext);

    window.onclick = (event) => {
        if (event.target.matches(".blur-background")) {
            setIsItemAdded(false);
        }
    };

    return (
        <div className="add-to-cart-modal">
            <div className="add-to-cart-modal__content">
                <img src={addedBook.image} alt={addedBook.title} />
                <div className="content">
                    <div className="circle">
                        <span>{icons.plus}</span>
                    </div>
                    <h1>
                        {addedBook.title} <br /> by {addedBook.author}
                    </h1>
                    <h2>
                        ADDED TO {isAddedToWishList ? "WISH LIST" : "CART"}!
                    </h2>
                </div>
                <div className="buttons">
                    <div
                        className="button"
                        onClick={() => {
                            setIsAddedToWishList(false);
                            setIsItemAdded(false);
                        }}
                    >
                        <span>{icons.basket}</span> CONTINUE SHOPPING
                    </div>
                    <Link
                        onClick={() => {
                            setIsAddedToWishList(false);
                            setIsItemAdded(false);
                        }}
                        to={isAddedToWishList ? "/wishList" : "/cart"}
                    >
                        <span>
                            {isAddedToWishList ? icons.wishList : icons.cart}
                        </span>{" "}
                        GO TO {isAddedToWishList ? "WISH LIST" : "CART"}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddToCartModal;
