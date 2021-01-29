import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import BooksCarouselItem from "./BooksCarouselItem";
import AddToCartModal from "./AddToCartModal";

const BooksCarousel = ({ responsive, books, isAdded, setIsAdded }) => {
    const [addedBook, setAddedBook] = useState({});

    return (
        <div className="books-carousel__container">
            <Carousel responsive={responsive}>
                {books.map((book) => {
                    return (
                        <BooksCarouselItem
                            key={book._id}
                            book={book}
                            setIsAdded={setIsAdded}
                            setAddedBook={setAddedBook}
                        />
                    );
                })}
            </Carousel>
            {isAdded && (
                <AddToCartModal setIsAdded={setIsAdded} addedBook={addedBook} />
            )}
        </div>
    );
};

export default BooksCarousel;
