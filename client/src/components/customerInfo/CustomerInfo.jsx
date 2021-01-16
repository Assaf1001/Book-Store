import React from "react";

import InfoItem from "./InfoItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTruck,
    faCreditCard,
    faRedoAlt,
    faShieldAlt,
    faQuestionCircle,
    faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
    shipping: <FontAwesomeIcon icon={faTruck} />,
    payment: <FontAwesomeIcon icon={faCreditCard} />,
    returns: <FontAwesomeIcon icon={faRedoAlt} />,
    privacy: <FontAwesomeIcon icon={faShieldAlt} />,
    faq: <FontAwesomeIcon icon={faQuestionCircle} />,
    find: <FontAwesomeIcon icon={faMapMarkerAlt} />,
};

const infoData = [
    {
        icon: icons.shipping,
        text: <p> SHIPPING</p>,
    },
    {
        icon: icons.payment,
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
