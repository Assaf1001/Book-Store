import React, { createContext, useState } from "react";

export const AddItemsContext = createContext();

const AddItemsContextProvider = (props) => {
    const [isItemAdded, setIsItemAdded] = useState(false);
    const [addedBook, setAddedBook] = useState({});

    return (
        <AddItemsContext.Provider
            value={{ isItemAdded, setIsItemAdded, addedBook, setAddedBook }}
        >
            {props.children}
        </AddItemsContext.Provider>
    );
};

export default AddItemsContextProvider;
