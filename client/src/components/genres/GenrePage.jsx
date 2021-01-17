import React, { useEffect, useReducer, useState } from "react";
import {
    filterBooksListAction,
    setBooksListAction,
} from "../../actions/booksListActions";
import booksListReducer, {
    initialBooksListState,
} from "../../reducers/booksListReducer";
import { getBooksByFieldAndValue } from "../../server/DB";
import BooksCarouselItem from "../carousels/booksCarousel/BooksCarouselItem";

const GenrePage = (props) => {
    const genre = props.match.params.genre;

    const [booksList, dispatchBooksList] = useReducer(
        booksListReducer,
        initialBooksListState
    );
    const [pageBooksList, setPageBooksList] = useState(booksList);

    const setFilterOptions = (field, innerField) => {
        const filterArray = [];

        return pageBooksList.map((book) => {
            const filterString = innerField
                ? book[field][innerField]
                : book[field];

            if (!filterArray.includes(filterString)) {
                filterArray.push(filterString);
                return <option key={book._id}>{filterString}</option>;
            }
            return null;
        });
    };

    useEffect(() => {
        getBooksByFieldAndValue("category", genre).then((booksListData) => {
            dispatchBooksList(setBooksListAction(booksListData));
            setPageBooksList(booksListData);
        });
    }, [genre]);

    return (
        <div className="genres-page__container center">
            <div className="filter__container">
                <h2>Filter Search</h2>
                <div className="filter-form">
                    <form>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" />
                        <label htmlFor="author">Author</label>
                        <select
                            onChange={(event) =>
                                dispatchBooksList(
                                    filterBooksListAction(
                                        pageBooksList,
                                        "author",
                                        event.target.value
                                    )
                                )
                            }
                            id="author"
                        >
                            <option value="All">All</option>
                            {setFilterOptions("author")}
                        </select>
                        <label htmlFor="genre">Genre</label>
                        <select id="genre">
                            <option value="all">All</option>
                            {setFilterOptions("category")}
                        </select>
                        <label htmlFor="language">Language</label>
                        <select id="language">
                            <option value="all">All</option>
                            {setFilterOptions("details", "language")}
                        </select>
                        <label htmlFor="price-range">Price Range</label>
                        <input type="range" name="" id="price-range" />
                    </form>
                </div>
            </div>
            <div className="genres__container">
                <h1>{genre.toUpperCase()} MANGA</h1>
                <div className="grid__container">
                    {booksList.map((book) => (
                        <BooksCarouselItem key={book._id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GenrePage;
