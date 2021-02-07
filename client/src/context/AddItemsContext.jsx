import React, { createContext, useState } from "react";

export const AddItemsContext = createContext();

const AddItemsContextProvider = (props) => {
    const [isItemAdded, setIsItemAdded] = useState(false);
    const [addedBook, setAddedBook] = useState({});

    const [isModalActive, setIsModalActive] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isEditBook, setIsEditBook] = useState(false);

    const toggleModal = (message) => {
        if (isModalActive) {
            setIsModalActive(false);
            setIsEditBook(false);
        } else {
            setModalMessage(message);
            setIsModalActive(true);
        }
    };

    return (
        <AddItemsContext.Provider
            value={{
                isItemAdded,
                setIsItemAdded,
                addedBook,
                setAddedBook,
                isModalActive,
                modalMessage,
                toggleModal,
                isEditBook,
                setIsEditBook,
            }}
        >
            {props.children}
        </AddItemsContext.Provider>
    );
};

export default AddItemsContextProvider;
