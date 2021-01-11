import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import BooksCarouselItem from "./BooksCarouselItem";

const BooksCarousel = ({ books }) => {
    const responsive = {
        largeDesktop: {
            breakpoint: { max: 4000, min: 1440 },
            items: 8,
            slidesToSlide: 8,
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
