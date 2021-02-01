import React, { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";

import icons from "../../../icons/icons";

const MyDetails = () => {
    const { userData } = useContext(LoginContext);

    return (
        <div className="my-details box">
            <div className="icon">{icons.user}</div>
            <div className="content">
                <h2>My Details</h2>
                <div className="forms">
                    <form className="details-form">
                        <label htmlFor="first-name">FIRST NAME</label>
                        <input
                            type="text"
                            id="first-name"
                            placeholder={userData.user.name.split(" ")[0]}
                        />
                        <label htmlFor="last-name">LAST NAME</label>
                        <input
                            type="text"
                            id="last-name"
                            placeholder={userData.user.name.split(" ")[1]}
                        />
                        <label htmlFor="email-adress">EMAIL ADRESS</label>
                        <input
                            type="text"
                            id="email-adress"
                            placeholder={userData.user.email}
                        />
                        <button type="submit">SAVE CHANGES</button>
                    </form>

                    <form className="password-form">
                        <label htmlFor="password">PASSOWRD</label>
                        <input type="password" id="password" />
                        <label htmlFor="new-password">NEW PASSWORD</label>
                        <input type="password" id="new-password" />
                        <label htmlFor="repeat-password">REPEAT PASSOWRD</label>
                        <input type="password" name="" id="repeat-password" />
                        <button type="submit">CHANGE PASSWORD</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyDetails;
