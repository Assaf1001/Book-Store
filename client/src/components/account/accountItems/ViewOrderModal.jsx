import React, { useContext } from "react";
import { AddItemsContext } from "../../../context/AddItemsContext";

const ViewOrderModal = ({ order, formatDate, setIsViewOrder }) => {
    const { toggleModal } = useContext(AddItemsContext);

    const billingInfo = order.info.billingInfo;
    const cardInfo = order.info.cardInfo;
    const cart = order.cart;

    const hideCardNumber = (cardNumber) => {
        let hiddenCardNumber = "";
        for (let i = 0; i < cardNumber.length - 4; i++) {
            hiddenCardNumber += cardNumber[i].replace(cardNumber[i], "*");
        }
        for (let i = cardNumber.length - 4; i < cardNumber.length; i++) {
            hiddenCardNumber += cardNumber[i];
        }
        return hiddenCardNumber;
    };

    return (
        <div className="admin__modal">
            <div className="view-order__modal">
                <h1>View Order: #{order.orderNumber}</h1>
                <h2>Ordered at: {formatDate(order.date)}</h2>
                <div className="user-details">
                    <p>To: {billingInfo.fullName}</p>
                    <p>
                        Adress: {billingInfo.adress}, {billingInfo.city}{" "}
                        {billingInfo.zipCode} {billingInfo.country}
                    </p>
                    <p>Phone number: {billingInfo.phoneNumber}</p>
                </div>
                <div className="payment-details">
                    <p>Card holder name: {cardInfo.cardHolderName}</p>
                    <p>Card number: {hideCardNumber(cardInfo.cardNumber)}</p>
                    <p>Expiration date: {cardInfo.expirationDate}</p>
                </div>
                <div className="cart-details">
                    <h2>Cart:</h2>
                    {cart.map((cartItem) => (
                        <div className="cart-item">
                            <p>
                                {cartItem.title} by {cartItem.author} -{" "}
                                {cartItem.price}$ X {cartItem.quantity}
                            </p>
                        </div>
                    ))}
                    <p>Total: {order.total}$</p>
                </div>
                <button
                    onClick={() => {
                        setIsViewOrder(false);
                        toggleModal();
                    }}
                >
                    CLOSE
                </button>
            </div>
        </div>
    );
};

export default ViewOrderModal;
