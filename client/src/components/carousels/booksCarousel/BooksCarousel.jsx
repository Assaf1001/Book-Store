import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import BooksCarouselItem from "./BooksCarouselItem";

const BooksCarousel = ({ responsive, books }) => {
    return (
        <div className="books-carousel__container">
            <Carousel responsive={responsive}>
                {books.map((book) => {
                    return <BooksCarouselItem key={book._id} book={book} />;
                })}
            </Carousel>
        </div>
    );
};

export default BooksCarousel;
