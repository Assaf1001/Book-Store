import React, { useContext, useEffect, useState } from "react";

import { addPurchased, emptyCart } from "../../server/user";
import { LoginContext } from "../../context/LoginContext";
import PurchasedModal from "./PurchasedModal";
import { getOrderNumber } from "../../server/general";

import icons from "../../icons/icons";
import { useHistory } from "react-router-dom";

const PaymentPage = (props) => {
    const total = props.location.state?.total;
    const cart = props.location.state?.cart;

    const { userData } = useContext(LoginContext);
    const [orderNumber, setOrderNumber] = useState(0);
    const [isPurchased, setIsPurchased] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (!cart || cart.length === 0) {
            history.push("/pageNotFound");
        }
    }, [cart, history]);

    const onSubmitForm = async (event) => {
        event.preventDefault();

        const orderNumberData = await getOrderNumber();
        setOrderNumber(orderNumberData);

        const fields = event.target;
        const purchasedObj = {
            date: Date(),
            orderNumber: orderNumberData,
            cart,
            info: {
                billingInfo: {
                    fullName: fields[0].value,
                    phoneNumber: fields[1].value,
                    adress: fields[2].value,
                    city: fields[3].value,
                    zipCode: fields[4].value,
                    country: fields[5].value,
                },
                cardInfo: {
                    cardNumber: fields[6].value,
                    cardHolderName: fields[7].value,
                    expirationDate: fields[8].value,
                    cvv: fields[9].value,
                },
            },
        };
        await addPurchased(purchasedObj, userData.token)
            .then(() => setIsPurchased(true))
            .catch((err) => {
                console.log(err);
            });
        await emptyCart(userData.token)
            .then()
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="payment-page">
            {isPurchased && <div className="blur-background"></div>}
            <div className="payment-page__contnet center">
                <h1>Payment</h1>
                <h2>Choose payment method</h2>
                <div className="payment-method">
                    <div className="payment-box credit-card">
                        <div className="card">{icons.creditCard}</div>
                    </div>
                    <div className="payment-box">
                        <div>
                            <span>{icons.paypal}</span> PayPal
                        </div>
                    </div>
                </div>
                <form onSubmit={onSubmitForm} className="payment-form">
                    <div className="info">
                        <div className="billing-info">
                            <h3>Billing Info</h3>
                            <label htmlFor="full-name">FULL NAME</label>
                            <input
                                type="text"
                                name=""
                                id="full-name"
                                placeholder="Enter your name"
                            />
                            <label htmlFor="phone-number">PHONE NUMBER</label>
                            <input
                                type="text"
                                name=""
                                id="phone-number"
                                placeholder="Enter your phone number"
                            />
                            <label htmlFor="adress">ADRESS</label>
                            <input
                                type="text"
                                name=""
                                id="adress"
                                placeholder="497 Evergreen Rd."
                            />
                            <div className="city-zipcode">
                                <div>
                                    <label htmlFor="city">CITY</label>
                                    <input
                                        type="text"
                                        name=""
                                        id="city"
                                        placeholder="Roseville"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="zip-code">ZIP CODE</label>
                                    <input
                                        type="text"
                                        name=""
                                        id="zip-code"
                                        placeholder="95673"
                                    />
                                </div>
                            </div>
                            <label htmlFor="coutnry">COUNTRY</label>
                            <select name="" id="country">
                                <option value="United-States">
                                    United States
                                </option>
                                <option value="United-Kingdon">
                                    United Kingdom
                                </option>
                                <option value="Israel">Israel</option>
                            </select>
                        </div>
                        <div className="credit-card-info">
                            <h3>Credit Card Info</h3>
                            <label htmlFor="card-number">CARD NUMBER</label>
                            <div className="card-input">
                                <input
                                    id="card-number"
                                    type="tel"
                                    maxLength="19"
                                    placeholder="4580 0000 1234 5678"
                                />
                                <div>
                                    <span>{icons.visa}</span>
                                </div>
                            </div>
                            <label htmlFor="cardholder-name">
                                CARDHOLDER NAME
                            </label>
                            <input
                                type="text"
                                id="cardholder-name"
                                placeholder="John Doe"
                            />
                            <label htmlFor="expiration-date">
                                EXPIRATION DATE
                            </label>
                            <select name="" id="expiration-date">
                                <option value="02/21">02/21</option>
                                <option value="03/21">03/21</option>
                                <option value="04/21">04/21</option>
                                <option value="05/21">05/21</option>
                                <option value="06/21">06/21</option>
                            </select>
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="tel"
                                id="cvv"
                                placeholder="123"
                                maxLength="3"
                            />
                            <button type="submit">
                                {" "}
                                Pay {total} $ <span>{icons.rightArrow}</span>
                            </button>
                        </div>
                    </div>
                </form>
                {isPurchased && <PurchasedModal orderNumber={orderNumber} />}
            </div>
        </div>
    );
};

export default PaymentPage;
