import React, { useContext, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import BooksCarouselItem from "./BooksCarouselItem";
import AddToCartModal from "./AddToCartModal";
import { AddItemsContext } from "../../../context/AddItemsContext";

const BooksCarousel = ({ responsive, books }) => {
    const { isItemAdded } = useContext(AddItemsContext);

    return (
        <div className="books-carousel__container">
            <Carousel responsive={responsive}>
                {books.map((book) => {
                    return <BooksCarouselItem key={book._id} book={book} />;
                })}
            </Carousel>
            {isItemAdded && <AddToCartModal />}
        </div>
    );
};

export default BooksCarousel;
