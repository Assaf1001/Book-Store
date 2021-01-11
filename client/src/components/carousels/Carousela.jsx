import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import CarouselItem from "./CarouselItem";

const Carousela = ({ books }) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { min: 1024 },
            items: 6,
            slidesToSlide: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
            slidesToSlide: 4,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 4,
            slidesToSlide: 4,
        },
    };

    return (
        <div className="carousel__container">
            <Carousel responsive={responsive}>
                {books.map((book) => {
                    return <CarouselItem key={book._id} book={book} />;
                })}
            </Carousel>
        </div>
    );
};

export default Carousela;
