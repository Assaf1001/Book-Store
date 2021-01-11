import React, { useEffect, useReducer } from "react";
import { setBooksAction } from "../../actions/booksActions";
import booksReducer, { initialBooksState } from "../../reducers/booksReducer";
import { getBooksFromDB } from "../../server/DB";
import CustomerInfo from "../customerInfo/CustomerInfo";

import BooksCarousel from "../carousels/booksCarousel/BooksCarousel";
import ImagesCarousel from "../carousels/imagesCarousel/ImagesCarousel";

const HomePage = () => {
    const [books, dispatchBooks] = useReducer(booksReducer, initialBooksState);

    useEffect(() => {
        getBooksFromDB()
            .then((booksData) => {
                dispatchBooks(setBooksAction(booksData));
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="home-page__container">
            <div className="home-page__content">
                <ImagesCarousel />
            </div>
            <div className="home-page__content center"></div>
            <div className="home-page__content">
                <BooksCarousel books={books} />
            </div>
            <CustomerInfo />
        </div>
    );
};

export default HomePage;
