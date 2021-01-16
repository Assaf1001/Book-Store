import React, { useEffect, useReducer, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { setBooksListAction } from "../../actions/booksListActions";
import booksListReducer, {
    initialBooksListState,
} from "../../reducers/booksListReducer";
import { getBookByID, getBooksByFieldAndValue } from "../../server/DB";
import BooksCarousel from "../carousels/booksCarousel/BooksCarousel";
import Book from "./Book";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const BookPage = (props) => {
    const bookId = props.match.params.id;
    const [book, setBook] = useState({});
    const [booksList, dispatchBooksList] = useReducer(
        booksListReducer,
        initialBooksListState
    );

    const history = useHistory();

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
        getBookByID(bookId)
            .then((bookData) => {
                setBook(bookData);
                window.scroll(0, 0);
            })
            .catch((err) => {
                console.log(err);
                history.push("/pageNotFound");
            });
    }, [bookId, history]);

    useEffect(() => {
        if (book.category) {
            getBooksByFieldAndValue("category", book.category)
                .then((booksData) => {
                    dispatchBooksList(setBooksListAction(booksData));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [book.category]);

    return (
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
                        VIEW MORE <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BookPage;
