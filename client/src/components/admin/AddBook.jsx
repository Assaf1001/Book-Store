import React, { createRef, useContext, useEffect, useState } from "react";
import { AddItemsContext } from "../../context/AddItemsContext";
import { LoginContext } from "../../context/LoginContext";
import { addBook, editBook } from "../../server/books";
import AdminModal from "./AdminModal";

const AddBook = ({ bookToEdit }) => {
    const { userData } = useContext(LoginContext);
    const {
        isModalActive,
        modalMessage,
        toggleModal,
        setIsEditBook,
    } = useContext(AddItemsContext);
    const [checkboxClass, setCheckboxClass] = useState("checkbox");
    const [isDiscountDisabled, setIsDiscountDisabled] = useState(true);

    const formInputs = createRef();

    const clearForm = (form) => {
        for (let input of form.current) {
            input.value = "";
        }
    };

    const onClickCheckboxActive = () => {
        if (checkboxClass === "checkbox") {
            setCheckboxClass("checkbox active");
            setIsDiscountDisabled(false);
        } else {
            setCheckboxClass("checkbox");
            setIsDiscountDisabled(true);
        }
    };

    useEffect(() => {
        if (bookToEdit && bookToEdit.discountInPercentage) {
            setCheckboxClass("checkbox active");
            setIsDiscountDisabled(false);
        }
    }, [bookToEdit]);

    const onSubmitForm = (event) => {
        event.preventDefault();
        const fields = formInputs.current;

        const book = {
            image: fields.image.value,
            title: fields.title.value,
            author: fields.author.value,
            price: fields.price.value,
            discountInPercentage: fields.discountInPercentage.value,
            category: fields.genre.value,
            details: {
                year: fields.year.value,
                isbn: fields.isbn.value,
                pages: fields.pages.value,
                publisher: fields.publisher.value,
                bestSellersRank: fields.bestSellersRank.value,
                language: fields.language.value,
                description: fields.description.value,
            },
        };

        if (fields.discountInPercentage.disabled)
            book.discountInPercentage = null;

        if (bookToEdit && userData.isAdmin) {
            editBook(bookToEdit._id, book, userData.token)
                .then((d) => {
                    toggleModal("Book edited successfully");
                })
                .catch((err) => {
                    toggleModal(err.toString());
                });
        } else {
            addBook(book, userData.token)
                .then(() => {
                    toggleModal("Book added successfully");
                })
                .catch((err) => {
                    toggleModal(err.toString());
                });
        }
    };

    return (
        <div className="add-book__container center">
            {isModalActive && (
                <AdminModal message={modalMessage} closeButton={"CLOSE"}>
                    <button
                        onClick={() => {
                            clearForm(formInputs);
                            toggleModal();
                        }}
                    >
                        CLEAR FORM
                    </button>
                </AdminModal>
            )}
            <h1>{bookToEdit ? "Edit book" : "Add book"}</h1>
            <form
                onSubmit={onSubmitForm}
                ref={formInputs}
                className="add-book__form"
            >
                <div className="part1">
                    <label htmlFor="title">TITLE</label>
                    <input
                        type="text"
                        id="title"
                        defaultValue={bookToEdit ? bookToEdit.title : ""}
                    />
                    <label htmlFor="author">AUTHOR</label>
                    <input
                        type="text"
                        id="author"
                        defaultValue={bookToEdit ? bookToEdit.author : ""}
                    />
                    <label htmlFor="genre">GENRE</label>
                    <select
                        id="genre"
                        defaultValue={bookToEdit ? bookToEdit.category : ""}
                    >
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="Romance">Romance</option>
                        <option value="Horror">Horror</option>
                    </select>
                    <label htmlFor="price">PRICE</label>
                    <input
                        type="number"
                        id="price"
                        min="1"
                        defaultValue={bookToEdit ? bookToEdit.price : ""}
                    />

                    <div className="discount">
                        <div
                            onClick={onClickCheckboxActive}
                            className={checkboxClass}
                        ></div>
                        <label htmlFor="discount">DISCOUNT</label>
                    </div>
                    <label htmlFor="discountInPercentage">
                        DISCOUNT IN PERCENTAGE
                    </label>
                    <input
                        disabled={isDiscountDisabled}
                        type="number"
                        id="discountInPercentage"
                        min="1"
                        defaultValue={
                            bookToEdit ? bookToEdit.discountInPercentage : ""
                        }
                    />
                </div>

                <div className="part2">
                    <label htmlFor="year">YEAR</label>
                    <input
                        type="number"
                        id="year"
                        min="1"
                        defaultValue={bookToEdit ? bookToEdit.details.year : ""}
                    />
                    <label htmlFor="isbn">ISBN</label>
                    <input
                        type="text"
                        id="isbn"
                        defaultValue={bookToEdit ? bookToEdit.details.isbn : ""}
                    />
                    <label htmlFor="pages">NUMBER OF PAGES</label>
                    <input
                        type="number"
                        id="pages"
                        min="1"
                        defaultValue={
                            bookToEdit ? bookToEdit.details.pages : ""
                        }
                    />
                    <label htmlFor="publisher">PUBLISHER</label>
                    <input
                        type="text"
                        id="publisher"
                        defaultValue={
                            bookToEdit ? bookToEdit.details.publisher : ""
                        }
                    />
                    <label htmlFor="bestSellersRank">BEST SELLERS RANK</label>
                    <input
                        type="text"
                        id="bestSellersRank"
                        defaultValue={
                            bookToEdit ? bookToEdit.details.bestSellersRank : ""
                        }
                    />
                    <label htmlFor="language">LANGUAGE</label>
                    <input
                        type="text"
                        id="language"
                        defaultValue={
                            bookToEdit ? bookToEdit.details.language : ""
                        }
                    />
                </div>

                <div className="part3">
                    <label htmlFor="image">IMAGE URL</label>
                    <input
                        type="text"
                        id="image"
                        defaultValue={bookToEdit ? bookToEdit.image : ""}
                    />
                    <label htmlFor="description">DESCRIPTION</label>
                    <textarea
                        id="description"
                        defaultValue={
                            bookToEdit ? bookToEdit.details.description : ""
                        }
                    />
                    <div className="buttons-container">
                        <button type="submit">
                            {bookToEdit ? "EDIT BOOK" : "ADD BOOK"}
                        </button>
                        {bookToEdit && (
                            <button onClick={() => setIsEditBook(false)}>
                                CENCEL
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddBook;
