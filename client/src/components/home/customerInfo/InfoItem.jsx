import React from "react";

const InfoItem = ({ icon, text }) => (
    <div className="customer-info__item--container">
        <div className="customer-info__item">{icon}</div>
        <span>{text}</span>
    </div>
);

export default InfoItem;
