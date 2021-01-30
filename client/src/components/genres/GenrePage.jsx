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

const GenrePage = (props) => {
    const genre = props.match.params.genre;
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

    useEffect(() => {
        window.scroll(0, 0);
        getBooksByFieldAndValue("category", genre).then((booksListData) => {
            dispatchBooksList(setBooksListAction(booksListData));
            setPageBooksList(booksListData);
            setPriceRange(getPriceRange(booksListData));
        });
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
            {isItemAdded && <div className="blur-background"></div>}
            {isItemAdded && <AddToCartModal />}
        </div>
    );
};

export default GenrePage;
