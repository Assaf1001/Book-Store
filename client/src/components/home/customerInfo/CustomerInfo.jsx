import React from "react";

import InfoItem from "./InfoItem";

import icons from "../../../icons/icons";

const infoData = [
    {
        icon: icons.truck,
        text: <p> SHIPPING</p>,
    },
    {
        icon: icons.creditCard,
        text: <p> PAYMENT</p>,
    },
    {
        icon: icons.returns,
        text: <p> RETURNS</p>,
    },
    {
        icon: icons.privacy,
        text: (
            <p>
                PRIVACY <br /> POLICY
            </p>
        ),
    },
    {
        icon: icons.faq,
        text: <p> FAQ</p>,
    },
    {
        icon: icons.find,
        text: (
            <p>
                FIND A <br /> STORE
            </p>
        ),
    },
];

const CustomerInfo = () => (
    <div className="customer-info__continer center">
        <h3>CUSTOMER INFORMATION</h3>
        <div className="customer-info__contnet">
            {infoData.map((info) => (
                <InfoItem
                    key={infoData.indexOf(info)}
                    icon={info.icon}
                    text={info.text}
                />
            ))}
        </div>
    </div>
);

export default CustomerInfo;
