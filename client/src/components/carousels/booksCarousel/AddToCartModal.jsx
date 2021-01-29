import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faShoppingBasket,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
    cart: <FontAwesomeIcon icon={faShoppingCart} />,
    basket: <FontAwesomeIcon icon={faShoppingBasket} />,
    plus: <FontAwesomeIcon icon={faPlus} />,
};

const AddToCartModal = ({ setIsAdded, addedBook }) => {
    return (
        <div className="add-to-cart-modal">
            <div className="add-to-cart-modal__content">
                <img src={addedBook.image} alt={addedBook.title} />
                <div className="text">
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
                            setIsAdded(false);
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
