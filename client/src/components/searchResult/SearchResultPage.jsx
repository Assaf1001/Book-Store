import React, { useContext, useEffect, useReducer, useState } from "react";
import { setBooksListAction } from "../../actions/booksListActions";
import { AddItemsContext } from "../../context/AddItemsContext";
import booksListReducer, {
    initialBooksListState,
} from "../../reducers/booksListReducer";
import { getBooksByFieldAndValue } from "../../server/books";

import BooksCarouselItem from "../carousels/booksCarousel/BooksCarouselItem";
import Filter from "../main/Filter";
import AddToCartModal from "../carousels/booksCarousel/AddToCartModal";
import AdminModal from "../admin/AdminModal";

const SearchResultPage = (props) => {
    const result = props.match.params.result;
    const {
        isItemAdded,
        toggleModal,
        setIsAddedToWishList,
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

        if (booksList.length === 0) {
            return { min: 0, max: 1 };
        }
        booksList.forEach((book) => {
            arr.push(book.price);
        });

        return { min: Math.min(...arr), max: Math.max(...arr) };
    };

    useEffect(() => {
        let isComponentExist = true;

        if (isComponentExist) {
            const setSearch = async () => {
                const searchByTitleData = await getBooksByFieldAndValue(
                    "title",
                    result
                );
                const searchByAuthorData = await getBooksByFieldAndValue(
                    "author",
                    result
                );
                const booksData = searchByTitleData;
                const booksDataIdArr = [];
                for (let book of booksData) {
                    booksDataIdArr.push(book._id);
                }
                for (let book of searchByAuthorData) {
                    if (!booksDataIdArr.includes(book._id))
                        booksData.push(book);
                }

                return booksData;
            };
            setSearch()
                .then((booksData) => {
                    window.scroll(0, 0);
                    dispatchBooksList(setBooksListAction(booksData));
                    setPageBooksList(booksData);
                    setPriceRange(getPriceRange(booksData));
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return () => (isComponentExist = false);
    }, [result]);

    return (
        <div className="genres-page__container center">
            <Filter
                dispatchBooksList={dispatchBooksList}
                pageBooksList={pageBooksList}
                priceRange={priceRange}
            />
            <div className="genres__container">
                <h1>SEARCH RESULT OF {result.toUpperCase()}</h1>
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

export default SearchResultPage;
