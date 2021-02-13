import React from "react";

import AddBook from "./AddBook";

const EditBookModal = ({ book }) => {
    return (
        <div className="admin__modal edit-book__modal ">
            <div className="edit-book__modal">
                <h1>Edit {book.title}</h1>
                <div className="edit-book__modal-contnet">
                    <AddBook bookToEdit={book} />
                </div>
            </div>
        </div>
    );
};

export default EditBookModal;
