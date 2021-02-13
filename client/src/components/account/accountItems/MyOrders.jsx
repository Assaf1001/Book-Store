import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { getOrders } from "../../../server/user";

import OrderItem from "./OrderItem";

import icons from "../../../icons/icons";

const MyOrders = () => {
    const { userData } = useContext(LoginContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        let isComponentExist = true;

        if (isComponentExist) {
            getOrders(userData.token)
                .then((ordersData) => {
                    setOrders(ordersData);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return () => (isComponentExist = false);
    }, [userData.token]);

    return (
        <div className="my-orders box">
            <div className="icon">{icons.cart}</div>
            <div className="content">
                <h2>My Orders</h2>
                {orders.length === 0 ? (
                    <h5>No orders yet..</h5>
                ) : (
                    orders.map((order) => (
                        <OrderItem
                            key={order.purchased.orderNumber}
                            order={order.purchased}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MyOrders;
