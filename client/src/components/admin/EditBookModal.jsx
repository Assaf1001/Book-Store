import React from "react";

import AddBook from "./AddBook";

const EditBookModal = ({ book }) => {
    return (
        <div className="edit-book__modal">
            <div className="edit-book__modal-contnet">
                <AddBook bookToEdit={book} />
            </div>
        </div>
    );
};

export default EditBookModal;
