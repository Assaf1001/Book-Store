import React, { useEffect, useReducer } from "react";
import { setBooksAction } from "../../actions/booksActions";
import booksReducer, { initialBooksState } from "../../reducers/booksReducer";
import { getBooksFromDB } from "../../server/DB";
import Carousela from "../carousels/Carousela";

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
                <Carousela books={books} />
            </div>
        </div>
    );
};

export default HomePage;
