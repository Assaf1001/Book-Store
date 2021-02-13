import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AddItemsContext } from "../../context/AddItemsContext";
import { LoginContext } from "../../context/LoginContext";
import booksListReducer, {
    initialBooksListState,
} from "../../reducers/booksListReducer";
import { setBooksListAction } from "../../actions/booksListActions";
import {
    getBookByID,
    getBooksByFieldAndValue,
    removeBook,
} from "../../server/books";

import Book from "./Book";
import BooksCarousel from "../carousels/booksCarousel/BooksCarousel";
import AdminModal from "../admin/AdminModal";
import EditBookModal from "../admin/EditBookModal";

import icons from "../../icons/icons";

const BookPage = (props) => {
    const bookId = props.match.params.id;
    const { userData } = useContext(LoginContext);
    const {
        isItemAdded,
        setIsAddedToWishList,
        isModalActive,
        toggleModal,
        modalMessage,
        isEditBook,
    } = useContext(AddItemsContext);

    const [book, setBook] = useState({});
    const [booksList, dispatchBooksList] = useReducer(
        booksListReducer,
        initialBooksListState
    );

    const history = useHistory();

    const onClickRemoveBook = (bookId, token) => {
        if (userData.isAdmin) {
            removeBook(bookId, token)
                .then(() => {
                    toggleModal();
                    history.push(`/genres/${book.category}`);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const responsive = {
        largeDesktop: {
            breakpoint: { max: 8000, min: 1440 },
            items: 6,
            slidesToSlide: 6,
        },
        desktop: {
            breakpoint: { max: 1440, min: 1024 },
            items: 6,
            slidesToSlide: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
            slidesToSlide: 4,
        },
        smallTablet: {
            breakpoint: { max: 650, min: 464 },
            items: 3,
            slidesToSlide: 3,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 2,
        },
    };

    useEffect(() => {
        let isComponentExist = true;

        if (isComponentExist) {
            getBookByID(bookId)
                .then((bookData) => {
                    setBook(bookData);
                    window.scroll(0, 0);
                })
                .catch((err) => {
                    console.log(err);
                    history.push("/pageNotFound");
                });
        }

        return () => (isComponentExist = false);
    }, [bookId, history, isEditBook]);

    useEffect(() => {
        let isComponentExist = true;

        if (isComponentExist) {
            if (book.category) {
                getBooksByFieldAndValue("category", book.category)
                    .then((booksData) => {
                        dispatchBooksList(setBooksListAction(booksData));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }

        return (isComponentExist = false);
    }, [book.category]);

    return (
        <div>
            {(isItemAdded || isModalActive) && (
                <div
                    onClick={() => {
                        if (isModalActive) toggleModal();
                        else setIsAddedToWishList(false);
                    }}
                    className="blur-background"
                ></div>
            )}
            {isEditBook && <EditBookModal book={book} />}
            {isModalActive && (
                <AdminModal
                    message={modalMessage}
                    closeButton={isEditBook ? "CLOSE" : "NO"}
                >
                    {!isEditBook && (
                        <button
                            onClick={() => {
                                onClickRemoveBook(book._id, userData.token);
                            }}
                        >
                            YES
                        </button>
                    )}
                </AdminModal>
            )}
            <div className="book-page__container center">
                <div className="book-page__contnet">
                    {book._id && <Book book={book} />}
                </div>
                {book._id && (
                    <h3 className="carousel__container-header">
                        MORE OF {book.category.toUpperCase()} MANGA
                    </h3>
                )}
                <div className="carousel__container">
                    <BooksCarousel responsive={responsive} books={booksList} />
                    <Link to={"/"}>
                        <button className="view-more__button">
                            VIEW MORE <span>{icons.rightArrow}</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
