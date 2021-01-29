import React, { createContext, useState } from "react";

export const AddItemsContext = createContext();

const AddItemsContextProvider = (props) => {
    const [isAdded, setIsAdded] = useState(false);
    const [addedBook, setAddedBook] = useState({});

    return (
        <AddItemsContext.Provider
            value={(isAdded, setIsAdded, addedBook, setAddedBook)}
        >
            {props.children}
        </AddItemsContext.Provider>
    );
};

export default AddItemsContextProvider;
