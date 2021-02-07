import React, { useContext } from "react";
import { AddItemsContext } from "../../context/AddItemsContext";

const AdminModal = (props) => {
    const { toggleModal } = useContext(AddItemsContext);

    return (
        <div className="admin__modal">
            <h1>{props.message}</h1>
            <div className="buttons-container">
                {props.children}
                <button onClick={toggleModal}> {props.closeButton}</button>
            </div>
        </div>
    );
};

export default AdminModal;
