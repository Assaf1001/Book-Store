import React, { useContext, useEffect, useReducer, useState } from "react";
import { setBooksListAction } from "../../actions/booksListActions";
import { AddItemsContext } from "../../context/AddItemsContext";
import booksListReducer, {
    initialBooksListState,
} from "../../reducers/booksListReducer";
import { getBooksByFieldAndValue } from "../../server/books";
import AddToCartModal from "../carousels/booksCarousel/AddToCartModal";
import BooksCarouselItem from "../carousels/booksCarousel/BooksCarouselItem";
import Filter from "../main/Filter";

const SearchResultPage = (props) => {
    const result = props.match.params.result;
    const { isItemAdded } = useContext(AddItemsContext);

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

    // let books = [];
    // useEffect(() => {
    //     window.scroll(0, 0);
    //     getBooksByFieldAndValue("title", result)
    //         .then((data) => {
    //             books = data;
    //             console.log(data)
    //         })
    //         .then((booksListData) => {
    //             dispatchBooksList(setBooksListAction(booksListData));
    //             setPageBooksList(booksListData);
    //             setPriceRange(getPriceRange(booksListData));
    //         })
    //         .catch((err) => {
    //             if (err.message === "Cannot find any books") {
    //                 dispatchBooksList(
    //                     setBooksListAction(initialBooksListState)
    //                 );
    //                 setPageBooksList(initialBooksListState);
    //                 setPriceRange({ min: 0, max: 1 });
    //             }
    //         });
    // }, [result]);

    // useEffect(() => {
    //     window.scroll(0, 0);
    //     (async () => {
    //         const searchByTitleData = await getBooksByFieldAndValue(
    //             "title",
    //             result
    //         );
    //         const searchByAuthorData = await getBooksByFieldAndValue(
    //             "author",
    //             result
    //         );
    //         const booksData = searchByAuthorData;
    //         // const booksData = searchByTitleData.concat(searchByAuthorData);
    //         console.log(searchByAuthorData);
    //         return booksData;
    //     })()
    //         .then((booksData) => {
    //             dispatchBooksList(setBooksListAction(booksData));
    //             setPageBooksList(booksData);
    //             setPriceRange(getPriceRange(booksData));
    //         })
    //         .catch((err) => {
    //             if (err.message === "Cannot find any books") {
    //                 dispatchBooksList(
    //                     setBooksListAction(initialBooksListState)
    //                 );
    //                 setPageBooksList(initialBooksListState);
    //                 setPriceRange({ min: 0, max: 1 });
    //             }
    //         });
    // }, [result]);

    useEffect(() => {
        const setSearch = async () => {
            const searchByTitleData = await getBooksByFieldAndValue(
                "title",
                result
            );
            const searchByAuthorData = await getBooksByFieldAndValue(
                "author",
                result
            );
            const booksData = searchByTitleData.concat(searchByAuthorData);
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
            {isItemAdded && <div className="blur-background"></div>}
            {isItemAdded && <AddToCartModal />}
        </div>
    );
};

export default SearchResultPage;
