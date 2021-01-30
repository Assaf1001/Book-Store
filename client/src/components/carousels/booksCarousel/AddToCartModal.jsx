import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AddItemsContext } from "../../../context/AddItemsContext";

import icons from "../../../icons/icons";

const AddToCartModal = () => {
    const { setIsItemAdded, addedBook } = useContext(AddItemsContext);

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
                    <h2>ADDED TO CART!</h2>
                </div>
                <div className="buttons">
                    <div
                        className="button"
                        onClick={() => {
                            setIsItemAdded(false);
                        }}
                    >
                        <span>{icons.basket}</span> CONTINUE SHOPPING
                    </div>
                    <Link to="/cart">
                        <span>{icons.cart}</span> GO TO CART
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddToCartModal;
