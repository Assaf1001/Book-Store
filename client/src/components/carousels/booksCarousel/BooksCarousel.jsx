import React, { useContext } from "react";
import { AddItemsContext } from "../../../context/AddItemsContext";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import BooksCarouselItem from "./BooksCarouselItem";
import AddToCartModal from "./AddToCartModal";
import AdminModal from "../../admin/AdminModal";

const BooksCarousel = ({ responsive, books }) => {
    const {
        isItemAdded,
        modalMessage,
        isModalActive,
        isAddedToWishList,
    } = useContext(AddItemsContext);

    return (
        <div className="books-carousel__container">
            <Carousel responsive={responsive}>
                {books.map((book) => {
                    return <BooksCarouselItem key={book._id} book={book} />;
                })}
            </Carousel>
            {isItemAdded && <AddToCartModal />}
            {isModalActive && isAddedToWishList && (
                <AdminModal message={modalMessage} closeButton={"CLOSE"} />
            )}
        </div>
    );
};

export default BooksCarousel;
