import React, { useContext, useState } from "react";
import { AddItemsContext } from "../../../context/AddItemsContext";
import ViewOrderModal from "./ViewOrderModal";

const OrderItem = ({ order }) => {
    const { toggleModal, isModalActive } = useContext(AddItemsContext);
    const [isViewOrder, setIsViewOrder] = useState(false);

    const formatDate = (date) => {
        const dateArr = date.split(" ");
        switch (dateArr[1]) {
            case "Jan":
                dateArr[1] = "01";
                break;
            case "Feb":
                dateArr[1] = "02";
                break;
            case "Mar":
                dateArr[1] = "03";
                break;
            case "Apr":
                dateArr[1] = "04";
                break;
            case "May":
                dateArr[1] = "05";
                break;
            case "Jun":
                dateArr[1] = "06";
                break;
            case "Jul":
                dateArr[1] = "07";
                break;
            case "Aug":
                dateArr[1] = "08";
                break;
            case "Sep":
                dateArr[1] = "09";
                break;
            case "Oct":
                dateArr[1] = "10";
                break;
            case "Nov":
                dateArr[1] = "11";
                break;
            case "Dec":
                dateArr[1] = "12";
                break;
            default:
                return;
        }
        const dateStr = `${dateArr[2]}/${dateArr[1]}/${dateArr[3]}`;
        return dateStr;
    };

    const getImages = (cart) => {
        const images = [];
        for (let i = 0; i < 4; i++) {
            if (!cart[i]) break;
            images.push(
                <img
                    key={cart[i]._id}
                    src={cart[i].image}
                    alt={cart[i].title}
                ></img>
            );
        }
        return images;
    };

    return (
        <div className="order-item">
            {isViewOrder && isModalActive && (
                <ViewOrderModal
                    order={order}
                    formatDate={formatDate}
                    setIsViewOrder={setIsViewOrder}
                />
            )}
            <div className="details">
                <div className="part1">
                    <h3>We've sent it!</h3>
                    <p>Order date: {formatDate(order.date)}</p>
                </div>
                <div className="part2">
                    <h4>Order number:</h4>
                    <p>#{order.orderNumber}</p>
                </div>
            </div>
            <div className="image-container">{getImages(order.cart)}</div>
            <div className="buttons">
                <button
                    onClick={() => {
                        setIsViewOrder(true);
                        toggleModal();
                    }}
                >
                    VIEW ORDER
                </button>
                <button className="track-button">TRACK ORDER</button>
            </div>
        </div>
    );
};

export default OrderItem;
