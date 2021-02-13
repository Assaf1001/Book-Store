import React, { useContext, useEffect, useReducer, useState } from "react";
import { AddItemsContext } from "../../context/AddItemsContext";
import booksListReducer, {
    initialBooksListState,
} from "../../reducers/booksListReducer";
import { setBooksListAction } from "../../actions/booksListActions";
import { getBooksByFieldAndValue } from "../../server/books";

import BooksCarouselItem from "../carousels/booksCarousel/BooksCarouselItem";
import AdminModal from "../admin/AdminModal";
import AddToCartModal from "../carousels/booksCarousel/AddToCartModal";
import Filter from "../main/Filter";

const GenrePage = (props) => {
    const genre = props.match.params.genre;
    const {
        isItemAdded,
        setIsAddedToWishList,
        toggleModal,
        isModalActive,
        modalMessage,
    } = useContext(AddItemsContext);

    const [booksList, dispatchBooksList] = useReducer(
        booksListReducer,
        initialBooksListState
    );
    const [pageBooksList, setPageBooksList] = useState(booksList);
    const [priceRange, setPriceRange] = useState({});

    const getPriceRange = (booksList) => {
        const arr = [];
        booksList.forEach((book) => {
            arr.push(book.price);
        });

        return { min: Math.min(...arr), max: Math.max(...arr) };
    };

    useEffect(() => {
        let isComponentExist = true;

        if (isComponentExist) {
            window.scroll(0, 0);
            getBooksByFieldAndValue("category", genre)
                .then((booksListData) => {
                    dispatchBooksList(setBooksListAction(booksListData));
                    setPageBooksList(booksListData);
                    setPriceRange(getPriceRange(booksListData));
                })
                .catch((err) => {
                    if (err.message === "Cannot find any books") {
                        dispatchBooksList(
                            setBooksListAction(initialBooksListState)
                        );
                        setPageBooksList(initialBooksListState);
                        setPriceRange({ min: 0, max: 1 });
                    }
                });
        }

        return () => (isComponentExist = false);
    }, [genre]);

    return (
        <div className="genres-page__container center">
            <Filter
                dispatchBooksList={dispatchBooksList}
                pageBooksList={pageBooksList}
                priceRange={priceRange}
            />
            <div className="genres__container">
                <h1>{genre.toUpperCase()} MANGA</h1>
                {booksList.length === 0 ? (
                    <h2>NO RESULTS!</h2>
                ) : (
                    <div className="grid__container">
                        {booksList.map((book) => (
                            <BooksCarouselItem key={book._id} book={book} />
                        ))}
                    </div>
                )}
            </div>
            {(isItemAdded || isModalActive) && (
                <div
                    onClick={() => {
                        if (isModalActive) toggleModal();
                        else setIsAddedToWishList(false);
                    }}
                    className="blur-background"
                ></div>
            )}
            {isItemAdded && <AddToCartModal />}
            {isModalActive && (
                <AdminModal message={modalMessage} closeButton={"CLOSE"} />
            )}
        </div>
    );
};

export default GenrePage;
