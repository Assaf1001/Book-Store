import React, { createContext, useState } from "react";

export const AddItemsContext = createContext();

const AddItemsContextProvider = (props) => {
    const [isItemAdded, setIsItemAdded] = useState(false);
    const [isAddedToWishList, setIsAddedToWishList] = useState(false);
    const [addedBook, setAddedBook] = useState({});

    const [isModalActive, setIsModalActive] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isEditBook, setIsEditBook] = useState(false);
    const [isChangeDetails, setIsChangeDetails] = useState(false);

    const toggleModal = (message) => {
        if (isModalActive) {
            setIsModalActive(false);
            setIsEditBook(false);
            setIsAddedToWishList(false);
            setIsChangeDetails(false);
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
                isAddedToWishList,
                setIsAddedToWishList,
                addedBook,
                setAddedBook,
                isModalActive,
                modalMessage,
                toggleModal,
                isEditBook,
                setIsEditBook,
                isChangeDetails,
                setIsChangeDetails,
            }}
        >
            {props.children}
        </AddItemsContext.Provider>
    );
};

export default AddItemsContextProvider;
